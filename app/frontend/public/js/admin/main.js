import $ from 'jquery';
import { Table } from './table.js';

const CONTENT = $('main');

async function tableFetch(api) {
	return fetch(api)
		.then(res => res.json())
		.then(data => new Table(api, data));
}

function dataDisplay(container, api, name) {
	container.empty();
	tableFetch(api)
		.then(t => container.attr('id', name).append(t.element));
}

$(() => {
	const dataSection = $('<section>');
	CONTENT.append([
		$('<select>')
			.on('input', e => {
				dataDisplay(dataSection, e.target.value, e.target.textContent);
			})
			.append([
				['products', '/api/products'],
				['sellers', '/api/sellers']
			].map(([name, api], i) => {
				const opt = $('<option>')
					.attr('value', api)
					.text(name);
				if(i == 0) {
					opt.attr('selected', '');
					dataDisplay(dataSection, api, name);
				}
				return opt;
			})),
		dataSection
	]);
});