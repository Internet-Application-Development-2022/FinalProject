import $ from 'jquery';

class Row extends HTMLTableRowElement {
	table;
	data;

	constructor(table, data) {
		super();

		this.table = table;
		this.data = data;

		$(this).append(
			Object
				.entries(data)
				.map(([key, value]) => this.generateCell(data, key, value))
		);
	}


	generateCell(object, key, value) {
		const instance = this.table;

		const container = $('<td>');
		const input = $('<input>')
			.attr('type', 'text');

		return container
			.text(value.toString())
			.on('click', function() {
				const parent = $(this).parent();
				if(!parent.prop('edit')) {
					parent.prop('edit', true);

					container.empty();
					container.append(
						input
							.attr('value', value.toString())
							.on('keydown', e => {
								switch(e.key) {
								case 'Enter':
									if(object[key] !== input.val()) {
										const copy = {...object};
										copy[key] = input.val();

										instance
											.update(copy)
											.then((response) => {
												if (!response.ok) {
													throw new Error('Network response was not OK');
												}

												object[key] = input.val();
											})
											.catch(() => { alert(`Failed to update field ${key}`); })
											.then(() => {
												container.empty();
												container.text(object[key]);

												parent.prop('edit', false);
											});
									}
									break;
								case 'Escape':
									container.empty();
									container.text(object[key]);

									parent.prop('edit', false);
								}
							})
					);
					input.trigger('focus');
				}
			});
	}
}

window.customElements.define('admin-tr', Row, {extends: 'tr'});


export class Table {
	#api;
	#element;

	get element() {
		return this.#element;
	}

	constructor(api, objects) {
		this.#api = api;
		this.#element = $('<table>')
			.append(this.generateHeaders(Object.keys(objects[0])))
			.append($('<tbody>')
				.append(objects.map(o => new Row(this, o)))
			);
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

	generateRow(object) {
		return $('<tr>')
			.append(
				Object
					.entries(object)
					.map(([key, value]) => this.generateCell(object, key, value))
			);
	}

	generateCell(object, key, value) {
		const instance = this;

		const container = $('<td>');
		const input = $('<input>')
			.attr('type', 'text');

		return container
			.text(value.toString())
			.on('click', function() {
				const parent = $(this).parent();
				if(!parent.prop('edit')) {
					parent.prop('edit', true);

					container.empty();
					container.append(
						input
							.attr('value', value.toString())
							.on('keydown', e => {
								switch(e.key) {
								case 'Enter':
									if(object[key] !== input.val()) {
										const copy = {...object};
										copy[key] = input.val();

										instance
											.update(copy)
											.then((response) => {
												if (!response.ok) {
													throw new Error('Network response was not OK');
												}

												object[key] = input.val();
											})
											.catch(() => { alert(`Failed to update field ${key}`); })
											.then(() => {
												container.empty();
												container.text(object[key]);

												parent.prop('edit', false);
											});
									}
									break;
								case 'Escape':
									container.empty();
									container.text(object[key]);

									parent.prop('edit', false);
								}
							})
					);
					input.trigger('focus');
				}
			});
	}

}