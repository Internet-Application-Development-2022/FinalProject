export class Seller {
	_id;
	name;
	email;
	phone;
	signature;
	location;

	constructor() {
		this.location = Array.from(Array(2));
	}

	toJSON() {
		return {
			_id: this._id,
			name: this.name,
			email: this.email,
			phone: this.phone,
			signature: this.signature,
			location: this.location.coordinates
		};
	}
}