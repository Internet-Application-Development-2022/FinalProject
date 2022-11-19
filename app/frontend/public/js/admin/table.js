import $ from 'jquery';

export class BaseRow extends HTMLTableRowElement {
	table;
	data;

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

	keyToElement(key) {
		switch(key) {
		case '_id':
			return $('<span>').text(this.data._id);
		default:
			return this.generateInput(
				() => this.data[key].toString(),
				async newVal => {
					const val = isNaN(newVal) ? newVal : Number(newVal);
					if (val === this.data[key]) {
						return;
					}
					return this.updateObject(key, val);
				}
			).parent();
		}
	}
}

window.customElements.define('admin-tr', BaseRow, {extends: 'tr'});


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