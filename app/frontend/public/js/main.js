import $ from 'jquery';
import { io } from 'socket.io-client';

import { PageRouter, HomePage, ShopPage, AboutPage, SupplierPage } from './routes.js';

const NAVIGATION_PAGES = [
	HomePage,
	ShopPage,
	AboutPage,
	SupplierPage
];

const requestNotificationPermission = () => new Promise((resolve, reject) => {
	if(!('Notification' in window)) {
		reject('Not supported');
	}
	else if (Notification.permission === 'granted') {
		resolve();
	}
	else if(Notification.permission !== 'denied') {
		Notification.requestPermission()
			.then(permission => {
				if(permission === 'granted') {
					resolve();
				}
			});
	}
	else {
		reject('request denied');
	}
});

$(() => {
	requestNotificationPermission().then(() => {
		const socket = io();
		console.log('socketio initialized');

		socket.on('advertise', ad => {
			new Notification(ad.title, {
				body: ad.text,
				icon: ad.img
			});
		});
	});

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