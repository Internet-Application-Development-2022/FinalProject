import { Router } from "./routes/router.js";
import { HomeRoute } from "./routes/home.js";
import { ShopRoute } from "./routes/shop.js";


export default new Router([
	new HomeRoute(),
	new ShopRoute()
], 0);