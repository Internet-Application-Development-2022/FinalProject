import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage, ShopPage} from '../routes.js';

export class HomeRoute extends Route {
	static PRODUCT_NUM = 8;
	fetchedProducts;
	
	constructor() {
		super('Home');
	}

	get products(){
		return this.fetchedProducts;
	}

	async onSelect(content,params) {

		await this.fetchProducts();

		$(content)
		.append(
			this.genHero()
		)
		.append(
			this.genFeatures()
		)
		.append(
			this.genProductConteiner()
		)
		
		.append(
			this.genJoin()
		)
		;
	}

	async fetchProducts() {
		if (this.fetchedProducts) {
			return;
		}
		this.fetchedProducts = await (await fetch('/api/products?size='+HomeRoute.PRODUCT_NUM))?.json();
	}

	genProductConteiner() {
		return $('<section>')
			.attr('id', 'products')
			.addClass('section-p1')
			.append($('<h2>').text('New Anrrivals'))
			.append($('<p>').text('New Collection Desings'))
			.append(
				$('<div>')
					.addClass('pro-container')
					.append(this.products.map(p => this.genProductElement(p)))
			);
	}
	genProductElement(product) {
		return $('<div>')
			.addClass('pro')
			.on('click', () => PageRouter.go(ProductPage, { id: product._id }))
			.append(
				$('<img>')
					.attr('src', product.img)
					.attr('alt', product.alt)
			).append(
				$('<div>')
					.addClass('des')
					.append($('<span>').text(product.catagory))
					.append($('<h5>').text(product.name))
					.append($('<div>')
						.addClass('Seller')
						.append($('<span>').text('sellser name'/*product.seller.name*/))
					).append(
						$('<h4>').text(`${product.price}${'$'/*product.currency.symbol*/}`)
					)
			).append($('<a>').append(
				$('<i>').addClass('bi bi-cart cart')
			));
	}
	genHero(){
		return $('<section>')
			.attr('id', 'hero')
			.append($('<h4>').text('Welcome to our Store'))
			.append($('<h2>').text('Super value deals'))
			.append($('<h2>').text('On all products'))
			.append($('<button>')
				.text('Shop Now!')
				.on('click',()=>PageRouter.go(ShopPage)))
	}
	genFeatures(){
		return $('<section>')
				.attr('id', 'feature')
				.addClass('section-p1')
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f1.png').attr('alt',''))
					.append($('<h6>').text('Worldwide Shipping'))
				)
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f2.png').attr('alt',''))
					.append($('<h6>').text('Fast Shipping'))
				)
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f3.png').attr('alt',''))
					.append($('<h6>').text('Save money'))
				)
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f4.png').attr('alt',''))
					.append($('<h6>').text('Spacial coupons'))
				)
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f5.png').attr('alt',''))
					.append($('<h6>').text('Great reviews'))
				)
				.append($('<div>')
					.addClass('fe-box')
					.append($('<img>').attr('src', '/public/img/features/f6.png').attr('alt',''))
					.append($('<h6>').text('24/7 Support'))
				)

	}
	genJoin(){
		return $('<section>')
			.attr('id', 'join')
			.addClass('section-m1')
			.append($('<h4>').text('Designer?'))
			.append($('<h2>').text('Join our designers and sell your designs HERE'))
			.append($('<button>').addClass('btn btn-light').text('Join us'))
		
	}
}