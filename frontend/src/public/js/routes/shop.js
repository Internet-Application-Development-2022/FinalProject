import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage } from '../routes.js';

export class ShopRoute extends Route {
	totalProductsAmount;
	fetchedProducts;
	params;
	page;

	static get PRODUCTS_PER_PAGE() { return 16; }

	get products() {
		return this.fetchedProducts[this.page];
	}

	get totalPagesAmount() {
		if (!this.totalProductsAmount) return 0;

		return Math.floor((this.totalProductsAmount - 1) / ShopRoute.PRODUCTS_PER_PAGE) + 1;
	}

	constructor() {
		super('Shop');
	}

	async onSelect(content, params) {
		this.params = params;
		this.page = parseInt(params?.page, 10);

		if (Number.isNaN(this.page)) {
			this.page = 0;
		}

		this.totalProductsAmount = await this.fetchTotalProductsAmount();

		if (0 < this.totalPagesAmount && this.totalPagesAmount <= this.page) {
			PageRouter.go(this);
			return;
		}

		await this.fetchProducts(this.page);

		$(content)
			.append(
				this.genProductfilter()
			)
			.append(
				this.genProductConteiner()
			)
			.append(
				this.genNavElement()
			);
	}

	async fetchTotalProductsAmount() {
		return parseInt(await (await fetch('/api/products/amount'))?.text(), 10);
	}

	async fetchProducts(page) {
		if (!this.fetchedProducts) {
			this.fetchedProducts = Array(this.totalPagesAmount);
		}

		if(this.fetchedProducts[page] !== undefined) {
			return;
		}

		this.fetchedProducts[page] =
			await (await fetch(`/api/products?size=${ShopRoute.PRODUCTS_PER_PAGE}&page=${page}`))?.json();
	}

	genProductfilter() {
		return $('<section>')
			.attr('id', 'filters-con')
			.addClass('section-p1')
			.append($('<span>').text('Filter:').attr('id','filter'))
			.append(
				$('<div>')
					.append(
						$('<Button>').text('Catagory')
							.addClass('btn btn-secondary dropdown-toggle but-cat')
							.attr('id','filter')
							.on('click',() => $('#list-cat').toggle())
						
					)
					.append(
						$('<ul>')
							.addClass('list-group')
							.attr('id','list-cat')
							.hide()
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Shirts')
										.on('click',this.filter('Shirts'))
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Pants')
										.on('click',this.filter('Pants'))
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Shoes')
									)
							)
					))
			.append(
				$('<div>')
					.append(
						$('<Button>').text('Seller')
							.addClass('btn btn-secondary dropdown-toggle but-sel')
							.attr('id', 'filter')
							.on('click',() => $('#list-sel').toggle())
					)
					.append(
						$('<ul>')
							.addClass('list-group')
							.attr('id','list-sel')
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Nir')
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Tom')
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Avi')
									)
							)
					))
					
		;
	}

	filter(filt){
		$( ".pro" ).each(function() {
			if(this.catagory!=filt)
			console.log(this);
			$(this).hide();
		  });
	}
	genProductfilter() {
		return $('<section>')
			.attr('id', 'filters-con')
			.addClass('section-p1')
			.append($('<span>').text('Filter:').attr('id','filter'))
			.append(
				$('<div>')
					.append(
						$('<Button>').text('Catagory')
							.addClass('btn btn-secondary dropdown-toggle but-cat')
							.attr('id','filter')
							.on('click',() => $('#list-cat').toggle())
						
					)
					.append(
						$('<ul>')
							.addClass('list-group')
							.attr('id','list-cat')
							.hide()
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Shirts')
										.on('click',this.filter('Shirts'))
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Pants')
										.on('click',this.filter('Pants'))
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Shoes')
									)
							)
					))
			.append(
				$('<div>')
					.append(
						$('<Button>').text('Seller')
							.addClass('btn btn-secondary dropdown-toggle but-sel')
							.attr('id', 'filter')
							.on('click',() => $('#list-sel').toggle())
					)
					.append(
						$('<ul>')
							.addClass('list-group')
							.attr('id','list-sel')
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Nir')
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Tom')
									)
							)
							.append(
								$('<li>')
									.addClass('list-group-item')
									.append(
										$('<a>').text('Avi')
									)
							)
					))
					
		;
	}
	genProductConteiner() {
		return $('<section>')
			.attr('id', 'products')
			.addClass('section-p1')
			.append(
				$('<div>')
					.addClass('pro-container')
					.append(this.products.map(p => this.genProductElement(p)))
			);
	}

	genProductElement(product) {
		return $('<div>')
			.addClass('pro')
			.on('click', () => PageRouter.go(ProductPage, { ...this.params, id: product._id }))
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

	genNavElement() {
		const navButtons = Array.from({
			length: this.totalPagesAmount
		}, (_, index) => $('<a>')
			.on('click', () => PageRouter.go(this, { ...this.params, page: index }))
			.text(index + 1)
		);

		if (this.page > 0) {
			navButtons.unshift($('<a>')
				.on('click', () => PageRouter.go(this, { ...this.params, page: this.page - 1 }))
				.append($('<i>')
					.addClass('bi bi-arrow-left')
				)
			);
		}

		if (this.page < this.totalPagesAmount - 1) {
			navButtons.push($('<a>')
				.on('click', () => PageRouter.go(this, { ...this.params, page: this.page + 1 }))
				.append($('<i>')
					.addClass('bi bi-arrow-right')
				)
			);
		}

		return $('<section>')
			.attr('id', 'page-nav')
			.addClass('section-p1')
			.append(navButtons);
	}

}