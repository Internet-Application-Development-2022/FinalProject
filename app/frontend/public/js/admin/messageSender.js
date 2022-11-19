import $ from 'jquery';
import { io } from 'socket.io-client';

export const socketio = io();

export const messageSenderElements = [
	$('<input>')
		.attr('id', 'check')
		.attr('type', 'checkbox'),
	$('<label>')
		.attr('for', 'check')
		.addClass('chat-btn')
		.append($('<i>').addClass('bi bi-chat-text')),
	$('<div>')
		.addClass('wrapper')
		.append([
			$('<div>')
				.addClass('chat-header')
				.append($('<h6>').text('Send Message To Sellers')),
			$('<div>')
				.addClass('text-center p-2'),
			$('<div>')
				.addClass('chat-form')
				.append([
					$('<textarea>')
						.addClass('form-control')
						.attr('placeholder', 'Your Text Message'),
					$('<button>')
						.addClass('btn btn-success btn-block')
						.text('Submit')
						.on('click', () => {

						})
				])
		])
];