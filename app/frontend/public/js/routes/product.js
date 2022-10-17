import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage } from '../routes.js';

export class ProductRoute extends Route {
	fetchedProduct;

	constructor() {
		super('Product');
	}

	get product() {
		return this.fetchedProduct;
	}

	async onSelect(content, params) {
		await this.fetchProduct(params.id);

		$(content)
			.append(
				this.genProductD(params.id)
			)
	}

	async fetchProduct(id) {
		this.fetchedProduct = await (await fetch('/api/products/' + id))?.json();
	}

	genProductD(id) {
		return $('<section>')
			.attr('id', 'product-details')
			.addClass('section-p1')
			.append($('<div>')
				.addClass('pro-big-pic')
				.append($('<img>')
					.addClass('big')
					.attr('src', this.product.img)
					.attr('alt', this.product.alt)
				)
				/*.append($('<div>')
					.addClass('small-img-g')
					.append($('<div>')
						.addClass('small-img-col')
						.append($('<img>')
							.attr('src', this.product.img)
							.attr('alt', this.product.alt)
						)
					)
					.append($('<div>')
						.addClass('small-img-col')
						.append($('<img>')
							.attr('src', this.product.img)
							.attr('alt', this.product.alt)
						)
					)
					.append($('<div>')
						.addClass('small-img-col')
						.append($('<img>')
							.attr('src', this.product.img)
							.attr('alt', this.product.alt)
						)
					)
					.append($('<div>')
						.addClass('small-img-col')
						.append($('<img>')
							.attr('src', this.product.img)
							.attr('alt', this.product.alt)
						)
					))*/)


			.append($('<div>')
				.addClass('text-details')
				.append($('<h6>').text('Home / T-Shirt'))
				.append($('<h4>').text('Mens Fashion T-Shirt'))
				.append($('<h2>').text(this.product.price))
				.append($('<select>')
					.addClass('form-select')
					.append($('<option>').text('Select Size'))
					.append($('<option>').text('S'))
					.append($('<option>').text('M'))
					.append($('<option>').text('L'))
					.append($('<option>').text('XL'))
					.append($('<option>').text('XXL'))
				)


				.append($('<input>').attr('type', 'number').attr('value', '1'))
				.append($('<button>').addClass('btn btn-success').text('Add to Cart'))
				.append($('<h4>').text('Product Details'))
				.append($('<span>').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum.'))
			)
	}
}
/*
<section id="product-details" class="section-p1">
		<div class="pro-big-pic">
			<img src="/public/img/products/f1.jpg" alt="Product" class="big">

			<div class="small-img-g">
				<div class="small-img-col">
					<img class="small-img" src="/public/img/products/f1.jpg" alt="small-img">
				</div>
				<div class="small-img-col">
					<img class="small-img" src="/public/img/products/f1.jpg" alt="small-img">
				</div>
				<div class="small-img-col">
					<img class="small-img" src="/public/img/products/f1.jpg" alt="small-img">
				</div>
				<div class="small-img-col">
					<img class="small-img" src="/public/img/products/f1.jpg" alt="small-img">
				</div>
			</div>
		</div>
		<div class="text-details">
			<h6>Home / T-Shirt</h6>
			<h4>Men's Fashion T-Shirt</h4>
			<h2>78$</h2>
			<select class="form-select">
				<option>Select Size</option>
				<option>S</option>
				<option>M</option>
				<option>L</option>
				<option>XL</option>
				<option>XXL</option>
			</select>
			<input type="number" value="1">
			<button class="btn btn-success">Add To Cart</button>
			<h4>Product Details</h4>
			<span>
				100% cotton
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
				quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
				laborum.
			</span>
		</div>
	</section>*/