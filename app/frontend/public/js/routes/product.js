import $ from 'jquery';
import { Route } from './router.js';

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
			.append(this.genProduct());
	}

	async fetchProduct(id) {
		this.fetchedProduct = await (await fetch('/api/products/' + id))?.json();
	}

	genProduct() {
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
			)


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
			);
	}
}


