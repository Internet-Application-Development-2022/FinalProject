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
    $('body').css('background-color','#eceefb')
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
								placeholder: 'Full Name',
								type: 'text',
								name: 'name'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'Email',
								type: 'email',
								name: 'email'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'Phone Number',
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
								placeholder: 'Latitude',
								type: 'number',
								name: 'location[0]'
							})
					)
					.append(
						$('<input>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
								placeholder: 'Longitude',
								type: 'number',
								name: 'location[1]'
							})
					)
					.append(
						$('<textarea>')
							.addClass('form-control')
              .prop('required',true)
							.attr({
                placeholder: 'Request Description',
                name: 'text',
              })
					)
          .append(
            $('<div>')
            .attr({
              id: 'empty',
              title: 'Empty signature',
              style: 'color: red'
            })
            .text('Signarute is required and cannot be empty')
            .hide()
          )
          .append(
            $('<div>')
            .append(
              this.canvas
              .addClass('col-auto')
            )
            .append(
              $('<button>')
                  .addClass('col-2 btn btn-primary btn-sm')
                  .attr('type', 'button')
                  .append(
                    $('<svg>')
                    .attr({
                      xmlns: 'http://www.w3.org/2000/svg',
                      width:"16", 
                      height: "16",
                      fill: "currentColor",
                      class: "bi bi-trash",
                      viewBox: "0 0 16 16"
                    })
                    .append(
                      $('<path>')
                      .attr({
                        d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                      })
                    )
                    .append(
                      $('<path>')
                      .attr({
                        'fill-rule': "evenodd",
                        d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      })
                    )
                  )
                  .click(() => {
                    this.hasData = false;
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
                if (this.hasData) {
								  this.signatureInput.val(this.canvas[0].toDataURL());
                }
                else {
                  this.signatureEmpty()
                }
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

	setupSignature() {
	}
}