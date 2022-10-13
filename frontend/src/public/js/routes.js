import $ from 'jquery';
import { Router } from "./routes/router.js";
import { HomeRoute } from "./routes/home.js";
import { ShopRoute } from "./routes/shop.js";
import { ProductRoute } from './routes/product.js';



export const HomePage = new HomeRoute();
export const ShopPage = new ShopRoute();
export const ProductPage = new ProductRoute();

export const PageRouter = new Router(HomePage, $('main')[0], [
	HomePage,
	ShopPage,
	ProductPage,
]);