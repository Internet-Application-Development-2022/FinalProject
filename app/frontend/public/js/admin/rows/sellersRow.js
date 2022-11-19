import $ from 'jquery';
import { BaseRow } from '../table.js';

export class SellerRow extends BaseRow {
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


	keyToElement(key) {
		switch(key) {
		case 'location':
			return this.generateLocationCell();
		default:
			return super.keyToElement(key);
		}
	}
}

window.customElements.define('seller-tr', SellerRow, {extends: 'tr'});