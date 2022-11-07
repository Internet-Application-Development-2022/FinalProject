export class Product {
	_id;
	seller;
	name;
	price;
	catagory;
	img;
	alt;

	toJSON() {
		return {
			_id: this._id,
			seller: this.seller,
			name: this.name,
			price: this.price,
			catagory: this.catagory,
			img: this.img,
			alt: this.alt,
		};
	}
}