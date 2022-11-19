import $ from 'jquery';

const Identity = (a => a);

export class BaseRow extends HTMLTableRowElement {
	table;
	data;

	static defineElement() {
		window.customElements.define(`${this.name.toLowerCase()}-tr`, this, {extends: 'tr'});
	}

	static {
		this.defineElement();
	}

	constructor(table, data) {
		super();

		this.table = table;
		this.data = data;

		$(this).append(Object
			.keys(this.data)
			.map(key => this.generateCell(key))
		);
	}

	async updateObject(key, val) {
		const copy = {...this.data};
		copy[key] = val;

		return this.table
			.update(copy)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not OK');
				}

				this.data[key] = val;
			});
	}

	quitEditing(input, value) {
		if(!this.table.editing) {
			return;
		}

		this.table.editing = false;
		input
			.prop('disabled', true)
			.val(value);
	}

	generateInput(getString, update) {
		const input = $('<input>')
			.val(getString())
			.addClass('table-input')
			.prop('disabled', true)
			.on('keydown', e => {
				switch(e.key) {
				case 'Enter':
					update(input.val())
						.then(() => this.quitEditing(input, getString()))
						.catch(e => { alert(`Failed to update\n${e.toString()}`); });
					break;
				case 'Escape':
					this.quitEditing(input, getString());
				}
			});

		$('<span>')
			.append(input)
			.on('click', () => {
				if(this.table.editing) {
					return;
				}
				this.table.editing = true;
				input.prop('disabled', false);
				input.trigger('focus');
			});

		return input;
	}

	generateCell(key) {
		return $('<td>').append(this.keyToElement(key));
	}

	input(key, fromString, fromObject, toObject, onUpdate, onError) {
		fromString = fromString || Identity;
		fromObject = fromObject || Identity;
		toObject = toObject || Identity;

		const update = async newVal => {
			const parsed = fromString(newVal);
			if(
				parsed === undefined ||
				parsed === null ||
				parsed === fromObject(this.data[key])
			) {
				return;
			}

			const objectUpdate = this.updateObject(key, toObject(parsed));

			if (onUpdate) {
				objectUpdate.then(function() { return onUpdate(...arguments); });
			}
	
			if (onError) {
				objectUpdate.catch(function(e) {
					onError(...arguments);
					throw e;
				});
			}

			return objectUpdate;
		};

		return this.generateInput(
			() => fromObject(this.data[key]).toString(),
			update
		);
	}

	numberInput(key, fromObject, toObject) {
		return this.input(
			key,
			strVal => isNaN(strVal) ? null : Number(strVal),
			fromObject,
			toObject
		).attr('type', 'number');
	}

	keyToElement(key) {
		switch(key) {
		case '_id':
			return $('<span>').text(this.data._id);
		default:
			return this.input(key).parent();
		}
	}
}


export class Table {
	#api;
	#element;
	editing;

	get element() {
		return this.#element;
	}

	constructor(api, objects, RowClass) {
		this.#api = api;
		this.#element = $('<table>')
			.addClass('table table-striped')
			.append(this.generateHeaders(Object.keys(objects[0])))
			.append($('<tbody>')
				.append(objects.map(o => new RowClass(this, o)))
			);
		this.editing = false;
	}

	async update(object) {
		return fetch(this.#api + '/' + object._id, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(object)
		});
	}

	generateHeaders(keys) {
		return $('<thead>')
			.append($('<tr>')
				.append(keys.map(k => $('<th>').text(k)))
			);
	}
}