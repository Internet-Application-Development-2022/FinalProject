import { BaseRow } from '../table.js';

export class ProductrRow extends BaseRow {

	static {
		this.defineElement();
	}

	keyToElement(key) {
		switch(key) {
		case 'price':
			return this.numberInput(key).parent();
		default:
			return super.keyToElement(key);
		}
	}
}