import $ from 'jquery';
import { io } from "socket.io-client";

import { PageRouter } from './routes.js';

$(() => {
	//const socket = io();
	console.log('ready');
	//console.log(socket);

	$('#header > a').on('click', () => PageRouter.go());

	Object.values(PageRouter.routes).forEach(route => {
		const button = $('<a>')
			.text(route.name)
			.on('click', () => PageRouter.go(route));

		PageRouter.addSelectListener(selected => {
			if (PageRouter.isSelected(route)) {
				button.addClass('active');
			}
			else {
				button.removeClass('active');
			}
		})

		$('#navbar').append(
			$('<li>').append(button)
		)
	});
})