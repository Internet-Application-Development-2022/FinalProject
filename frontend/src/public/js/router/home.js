import { Route } from "./router.js";

export class HomeRoute extends Route {
	constructor() {
		super('Home');
	}

	onSelect(main) {
		console.log('home entered');
	}
}