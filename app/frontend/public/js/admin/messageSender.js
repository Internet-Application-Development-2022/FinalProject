import $ from 'jquery';
import { io } from 'socket.io-client';

export const socket = io();

const checkbox =$('<input>')
	.attr('id', 'check')
	.attr('type', 'checkbox');

const title = $('<input>')
	.attr('type', 'text')
	.addClass('form-control')
	.attr('placeholder', 'title');
const textArea = $('<textarea>')
	.addClass('form-control')
	.attr('placeholder', 'Your Text Message');
const img = $('<input>')
	.attr('type', 'text')
	.addClass('form-control')
	.attr('placeholder', 'image url');

export const messageSenderElements = [
	checkbox,
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
				.addClass('chat-form')
				.append([
					title,
					textArea,
					img,
					$('<button>')
						.addClass('btn btn-success btn-block')
						.text('Submit')
						.on('click', () => {
							if(!title.val()) { return; }

							socket.emit('advertise', {
								title: title.val(),
								text: textArea.val(),
								img: img.val()
							});

							title.val('');
							textArea.val('');
							img.val('');

							checkbox.trigger('click');
						})
				])
		])
];