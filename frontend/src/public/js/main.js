import $ from './jquery.js';
import { io } from "socket.io-client";

import router from './routes.js';

$(() => {
	//const socket = io();
	console.log('ready');
	//console.log(socket);

	$('#header > a').click(() => router.select());

	router.setContent($('main'));

	router.routes.forEach((route, indx) => {
		const button = $('<a>');
		button.text(route.name);
		button.click(() => router.select(indx))

		router.addSelectListener(selected => {
			if (router.isSelected(route)) {
				button.addClass('active');
			}
			else {
				button.removeClass('active');
			}
		})

		$('#navbar').append($('<li>').append(button))
	});

	router.select();
})