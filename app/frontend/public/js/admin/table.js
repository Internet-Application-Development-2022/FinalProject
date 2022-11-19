import $ from 'jquery';

export class BaseRow extends HTMLTableRowElement {
	table;
	data;

	constructor(table, data) {
		super();

		this.table = table;
		this.data = data;
	}

	async updateObject(object, key, val) {
		if(object[key] === val) {
			return;
		}

		const copy = {...object};
		copy[key] = val;

		return this.table
			.update(copy)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not OK');
				}

				object[key] = val;
			})
			.catch(() => { alert(`Failed to update field ${key}`); });
	}

	quitEditing(cell, text) {
		cell.empty();
		cell.text(text);

		this.table.editing = false;
	}

	generateCell(object, key) {
		const cell = $('<td>');
		const input = $('<input>')
			.attr('type', 'text')
			.on('keydown', e => {
				switch(e.key) {
				case 'Enter':
					this
						.updateObject(object, key, input.val())
						.then(() => {
							this.quitEditing(cell, object[key]);
						});
					break;
				case 'Escape':
					this.quitEditing(cell, object[key]);
				}
			});

		return cell
			.text(object[key].toString())
			.on('click', () => {
				if(this.table.editing) {
					return;
				}

				this.table.editing = true;

				cell.empty();
				cell.append(
					input.attr('value', object[key].toString())
				);

				input.trigger('focus');
			});
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