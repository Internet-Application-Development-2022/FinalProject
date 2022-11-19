import $ from 'jquery';
import { BaseRow } from '../table.js';

export class SellerRow extends BaseRow {

	constructor(table, data) {
		super(table, data);

		$(this).append(
			Object
				.keys(this.data)
				.map(key => {
					switch(key) {
					case 'location':
						return this.generateLocationCell();
					default:
						return this.generateCell(data, key);
					}
				})
		);
	}

	async updateObject(key, val) {
		const copy = {...this.data};
		copy[key] = val;

		return this.table
			.update(copy)
			.then((response) => {
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

	generateLocationCell() {
		const [lat, lon] = this.data.location
			.map((_, i) => this.generateInput(
				() => this.data.location[i].toString(),
				async newVal => {
					const newValNum = Number(newVal);
					if (newValNum === this.data.location[i]) {
						return;
					}
					const copy = [...this.data.location];
					copy[i] = newValNum;
					return this.updateObject('location', copy);
				})
				.attr('type', 'number')
				.parent()
			);

		return $('<td>').append([
			$('<lable>')
				.text('lat: ')
				.append(lat),
			$('<lable>')
				.text('lon: ')
				.append(lon)
		]);
	}
}

window.customElements.define('seller-tr', SellerRow, {extends: 'tr'});