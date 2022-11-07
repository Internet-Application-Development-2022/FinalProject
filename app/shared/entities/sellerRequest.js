export class SellerRequest {
	_id;
	name;
	email;
	phone;
	signature;
	location;
	text;
	status;

	toJSON() {
		return {
			_id: this._id,
			name: this.name,
			email: this.email,
			phone: this.phone,
			signature: this.signature,
			location: this.location.coordinates,
			text: this.text,
			status: this.status
		};
	}
}