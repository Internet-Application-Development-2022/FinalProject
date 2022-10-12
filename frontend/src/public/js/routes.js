import { Router } from "./router/router.js";
import { HomeRoute } from "./router/home.js";
import { ShopRoute } from "./router/shop.js";


export default new Router([
	new HomeRoute(),
	new ShopRoute()
], 0);