import { Route } from "./router.js";

export class ShopRoute extends Route {
	constructor() {
		super('Shop');
	}

	onSelect(main) {
		console.log('shop entered');
	}
}