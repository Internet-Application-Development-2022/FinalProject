import $ from 'jquery';
import { Route } from './router.js';
import { PageRouter, ProductPage } from '../routes.js';

export class ShopRoute extends Route {
	fetchedProducts;
	filteredProducts;
	params;
	page;

	static get PRODUCTS_PER_PAGE() { return 16; }

	static get FILTERS() { return [
		'catagory',
		'seller',
		'priceMin',
		'priceMax',
	]}

	get totalProductsAmount() {
		return this.filteredProducts?.length;
	}

	get products() {
		return this.filteredProducts.slice(
			this.page * ShopRoute.PRODUCTS_PER_PAGE,
			(this.page + 1) * ShopRoute.PRODUCTS_PER_PAGE
		);
	}

	get totalPagesAmount() {
		if (!this.totalProductsAmount) return 0;

		return Math.floor((this.totalProductsAmount - 1) / ShopRoute.PRODUCTS_PER_PAGE) + 1;
	}

	constructor() {
		super('Shop');
	}

	/*
	param: {
		page: 2,
		catagory: 'shirts'
	}
	*/
	async onSelect(content, params) {
		this.params = params;
		this.page = parseInt(params?.page, 10);

		if (Number.isNaN(this.page)) {
			this.page = 0;
		}
		
		await this.fetchProducts();

		// if filter changed, clear saved data

		this.filterProducts();

		if (this.page < 0 || (0 < this.totalPagesAmount && this.totalPagesAmount <= this.page)) {
			PageRouter.go(this, { ...this.params, page: 0 });
			return;
		}

		$(content)
			.append(
				this.genProductFilter()
			)
			.append(
				this.genProductConteiner()
			)
			.append(
				this.genNavElement()
			);
	}

	async fetchProducts() {
		if (this.fetchedProducts) {
			return;
		}

		this.fetchedProducts = await (await fetch('/api/products'))?.json();
	}

	filterProducts() {
		this.filteredProducts = [...this.fetchedProducts];

		[
			'catagory',
			'seller'
		].filter(key => key in this.params && this.params[key])
		.forEach(filterKey => {
			const filterValue = this.params[filterKey];

			this.filteredProducts = this.filteredProducts.filter(prod => prod[filterKey] === filterValue)
		})
        /*
		'catagory',
		'seller',
		'priceMin',
		'priceMax',
		*/
	}

	genProductFilter() {
		return $('<section>')
			.attr('id', 'filters-con')
			.addClass('section-p1')
			.append($('<span>').text('Filter:').attr('id','filter'))
			.append($('<div>')
				.append(
					$('<Button>').text('Catagory: ' + (this.params?.catagory || 'All'))
						.addClass('btn btn-secondary dropdown-toggle but-cat')
						.attr('id','filter')
						.on('click',() => $('#list-cat').toggle())
					
				)
				.append($('<ul>')
					.addClass('list-group')
					.attr('id','list-cat')
					.hide()
					.append(/*
						$('<li>')
							.addClass('list-group-item')
							.append(
								$('<a>').text('Shirts')
								.on('click',this.filter('Shirts'))
							)*/
						[
							this.genFilterDropdown('catagory', '', 'All'),
							this.genFilterDropdown('catagory', 'catagory 1'),
							this.genFilterDropdown('catagory', 'catagory 2'),
							this.genFilterDropdown('catagory', 'catagory 3'),
						]
					)
				)
			)
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

	genFilterDropdown(key, value, text) {
		const pageParams = { ...this.params };
		pageParams[key] = value;

		return $('<li>')
			.addClass('list-group-item')
			.append(
				$('<a>')
					.text(text || value)
					.on('click', () => PageRouter.go(this, pageParams))
			)
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