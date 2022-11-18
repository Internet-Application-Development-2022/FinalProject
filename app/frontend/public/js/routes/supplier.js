import $ from 'jquery';
import { Route } from './router.js';

export class SupplierRoute extends Route {
	canvas;
	signatureInput;
	signatureData;

	constructor() {
		super('Supplier');

		this.signatureInput = $('<input>')
			.attr({
				type: 'text',
				name: 'signature'
			})
			.hide();

		this.signatureData = {
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
			.on('mousedown', e => {
				this.signatureData.drawing = true;
				this.signatureData.lastPos = this.getMousePos(e);
			})
			.on('mouseup', () => {
				this.signatureData.drawing = false;
			})
			.on('mousemove', e => {
				this.signatureData.mousePos = this.getMousePos(e);
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

	async onSelect(content, params) {
		$(content)
			.append(
				this.genRegisterMenu()
			);
	}

	genRegisterMenu() {
		return $('<section>')
			.attr('id', 'register')
			.addClass('section-p1')
			.append(
				$('<form>')
					.addClass('pro-container')
					.attr({
						action: '/api/seller-requests',
						method: 'post'
					})
					.append(
						this.signatureInput
					)
					.append(
						$('<input>')
							.addClass('form-control')
							.attr({
								placeholder: 'name',
								type: 'text',
								name: 'name'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
							.attr({
								placeholder: 'email',
								type: 'email',
								name: 'email'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
							.attr({
								placeholder: 'phone',
								type: 'tel',
								name: 'phone',
								pattern: '[0-9]{10}'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
							.attr({
								placeholder: 'lat',
								type: 'number',
								name: 'location[0]'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
							.attr({
								placeholder: 'lon',
								type: 'number',
								name: 'location[1]'
							})
					)
					.append(
						$('<textarea>')
							.addClass('form-control')
							.attr('placeholder', 'Request description')
							.attr('name', 'text')
					)
					.append(
						this.canvas
					)
					.append(
						$('<button>')
							.addClass('btn btn-outline-dark')
							.attr('type', 'submit')
							.text('Submit')
							.on('click', () => {
								this.signatureInput.val(this.canvas[0].toDataURL());
							})
					)
			);
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

	setupSignature() {
		/*
		// Set up the UI
		var sigText = document.getElementById('sig-dataUrl');
		var sigImage = document.getElementById('sig-image');
		var clearBtn = document.getElementById('sig-clearBtn');
		var submitBtn = document.getElementById('sig-submitBtn');

		clearBtn.addEventListener('click', () => {
			this.clearCanvas();
			sigText.innerHTML = 'Data URL for your signature will go here!';
			sigImage.setAttribute('src', '');
		}, false);
		submitBtn.addEventListener('click', () => {
			var dataUrl = this.canvas[0].toDataURL();
			sigText.innerHTML = dataUrl;
			sigImage.setAttribute('src', dataUrl);
		}, false);
    */
	}
}