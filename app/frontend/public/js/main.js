import $ from 'jquery';
import { io } from 'socket.io-client';

import { PageRouter, HomePage, ShopPage, AboutPage, SupplierPage } from './routes.js';

const NAVIGATION_PAGES = [
	HomePage,
	ShopPage,
	AboutPage,
	SupplierPage
];

$(() => {
	//const socket = io();
	//console.log(socket);

	$('#header > a').on('click', () => PageRouter.go());

	NAVIGATION_PAGES.forEach(route => {
		const button = $('<a>')
			.text(route.name)
			.on('click', () => PageRouter.go(route));

		PageRouter.addSelectListener(() => {
			if (PageRouter.isSelected(route)) {
				button.addClass('active');
			}
			else {
				button.removeClass('active');
			}
		});

		$('#navbar').append(
			$('<li>').append(button)
		);
	});
});