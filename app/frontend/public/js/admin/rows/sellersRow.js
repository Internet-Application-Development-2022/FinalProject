import $ from 'jquery';
import { BaseRow } from '../table.js';

export class SellerRow extends BaseRow {

	static {
		this.defineElement();
	}

	generateLocationCell() {
		const [lat, lon] = this.data.location
			.map((_, i) => this.numberInput(
				'location',
				loc => loc[i],
				l => {
					const copy = [...this.data.location];
					copy[i] = l;
					return copy;
				})
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

	generateSignature() {
		const img = $('<img>').attr('src', this.data.signature);
		return [
			img,
			this.input('signature', 0, 0, 0,
				() => img.attr('src', this.data.signature))
				.parent()
		];
	}

	keyToElement(key) {
		switch(key) {
		case 'location':
			return this.generateLocationCell();
		case 'signature':
			return this.generateSignature();
		default:
			return super.keyToElement(key);
		}
	}
}