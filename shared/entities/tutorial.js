export class Tutorial {
	title;
	description;
	published;

	toJSON() {
		return {
			title: this.title,
			description: this.description,
			published: this.published
		};
	}
}