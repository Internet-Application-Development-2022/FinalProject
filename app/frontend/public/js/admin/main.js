import $ from 'jquery';

import { Table, BaseRow } from './table.js';
import { SellerRow } from './rows/sellersRow.js';

const CONTENT = $('main');

const APIS = {
	'/api/products': ['products', BaseRow],
	'/api/sellers': ['sellers', SellerRow]
};

async function tableFetch(api, RowClass) {
	return fetch(api)
		.then(res => res.json())
		.then(data => new Table(api, data, RowClass));
}

function dataDisplay(container, api, name, RowClass) {
	container.empty();
	tableFetch(api, RowClass)
		.then(t => container.attr('id', name).append(t.element));
}

$(() => {
	const dataSection = $('<section>');
	CONTENT.append([
		$('<select>')
			.on('input', e => {
				dataDisplay(dataSection, e.target.value, ...APIS[e.target.value]);
			})
			.append(Object.entries(APIS).map(([api, [name, RowClass]], i) => {
				const opt = $('<option>')
					.attr('value', api)
					.text(name);
				if(i == 0) {
					opt.attr('selected', '');
					dataDisplay(dataSection, api, name, RowClass);
				}
				return opt;
			})),
		dataSection
	]);
});