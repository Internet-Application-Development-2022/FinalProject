import $ from 'jquery';
import { Route } from './router.js';

export class SupplierRoute extends Route {
	canvas;
	signatureInput;
	signatureData;

	constructor() {
		super('Supplier');

		this.signatureInput = $('<input>')
			.prop('required', true)
			.attr({
				type: 'text',
				name: 'signature'
			})
			.hide();

		this.signatureData = {
			hasData: false,
			drawing: false,
			mousePos: {
				x: 0,
				y: 0
			},
			lastPos: {
				x: 0,
				y: 0
			}
		};

		this.canvas = $('<canvas>')
			.attr({
				id: 'sig-canvas',
				width: 175,
				height: 75
			})
			.css('background-color', 'white')
			.on('mousedown', e => {
				this.hasData = true;
				this.signatureData.drawing = true;
				this.signatureData.lastPos = this.getMousePos(e);
			})
			.on('mouseup', () => {
				this.signatureData.drawing = false;
			})
			.on('mousemove', e => {
				this.signatureData.mousePos = this.getMousePos(e);
			})
			.on('mouseleave', () => {
				this.signatureData.drawing = false;
			});

		this.ctx.strokeStyle = '#222222';
		this.ctx.lineWidth = 2;

		const drawLoop = () => {
			window.requestAnimationFrame(drawLoop);
			this.renderCanvas();
		};
		drawLoop();
	}

	get ctx() {
		return this.canvas[0].getContext('2d');
	}

	async onSelect(content) {
		$(content)
			.append(this.genRegisterMenu());
	}

	genRegisterMenu() {
		return $('<section>')
			.attr('id', 'register')
			.addClass('section-p1')
			.append($('<form>')
				.addClass('pro-container')
				.attr({
					action: '/api/seller-requests',
					method: 'post'
				})
				.append(this.signatureInput)
				.append($('<input>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Full Name',
						type: 'text',
						name: 'name'
					})
				).append($('<input>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Email',
						type: 'email',
						name: 'email'
					})
				).append($('<input>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Phone Number',
						type: 'tel',
						name: 'phone',
						pattern: '[0-9]{10}'
					})
				).append($('<input>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Latitude',
						type: 'number',
						name: 'location[0]'
					})
				).append($('<input>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Longitude',
						type: 'number',
						name: 'location[1]'
					})
				).append($('<textarea>')
					.addClass('form-control')
					.prop('required', true)
					.attr({
						placeholder: 'Request Description',
						name: 'text',
					})
				).append($('<div>')
					.attr({
						id: 'empty',
						title: 'Empty signature',
						style: 'color: red'
					})
					.text('Signarute is required and cannot be empty')
					.hide()
				).append($('<div>')
					.append(this.canvas.addClass('col-auto'))
					.append($('<button>')
						.addClass('col-2 btn btn-primary btn-sm')
						.attr('type', 'button')
						.append($('<i>').addClass('bi bi-trash'))
						.on('click', () => {
							this.hasData = false;
							this.canvas.attr('width', this.canvas.attr('width'));
						})
					)
				).append($('<button>')
					.addClass('btn btn-outline-dark')
					.attr('type', 'submit')
					.text('Submit')
					.on('click', () => {
						this.hasData ?
							this.signatureInput.val(this.canvas[0].toDataURL()) :
							this.signatureEmpty();
					})
				)
			);
	}

	signatureEmpty() {
		$('#empty').show();
	}

	getMousePos(mouseEvent) {
		var rect = this.canvas[0].getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left,
			y: mouseEvent.clientY - rect.top
		};
	}

	renderCanvas() {
		const { mousePos, lastPos, drawing } = this.signatureData;

		if (drawing) {
			this.ctx.moveTo(lastPos.x, lastPos.y);
			this.ctx.lineTo(mousePos.x, mousePos.y);
			this.ctx.stroke();
			this.signatureData.lastPos = mousePos;
		}
	}

	clearCanvas() {
		this.canvas.attr('width', this.canvas.attr('width'));
	}
}