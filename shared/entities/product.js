export class Product {
	_id;
	name;
	price;
	catagory;
	img;
	alt;

	toJSON() {
		return {
			_id: this._id,
			name: this.name,
			price: this.price,
			catagory: this.catagory,
			img: this.img,
			alt: this.alt,
		};
	}
}