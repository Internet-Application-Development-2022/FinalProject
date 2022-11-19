import $ from 'jquery';

import { BaseRow } from '../table.js';

export class SimpleRow extends BaseRow {

	constructor(table, data) {
		super(table, data);

		$(this).append(Object
			.keys(this.data)
			.map(key => this.generateCell(key))
		);
	}

}

window.customElements.define('base-tr', SimpleRow, {extends: 'tr'});