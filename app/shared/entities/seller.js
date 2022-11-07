export class Seller {
	_id;
	name;
	email;
	phone;
	signature;
	location;

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