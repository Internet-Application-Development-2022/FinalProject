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
			})
      .on('mouseleave', e => {
        this.signatureData.drawing = false
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
            .prop('required',true)
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'name',
								type: 'text',
								name: 'name'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'email',
								type: 'email',
								name: 'email'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
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
              .prop('required',true)
							.attr({
								placeholder: 'lat',
								type: 'number',
								name: 'location[0]'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'lon',
								type: 'number',
								name: 'location[1]'
							})
					)
					.append(
						$('<textarea>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
                placeholder: 'Request description',
                name: 'text',
              })
					)
          .append(
            $('<div>')
            .addClass('row')
            .append(
              this.canvas
              .addClass('col-auto')
            )
            .append(
              $('<button>')
                  .addClass('col-auto btn btn-primary btn-sm')
                  .attr('type', 'button')
                  .text('clear')
                  .click(() => {
                    this.canvas.attr('width', this.canvas.attr('width'));
                  })
            )
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
	}
}