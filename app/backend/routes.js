import { Router } from 'express';

import products from './routes/product.js';
import sellers from './routes/seller.js';
import sellerRequests from './routes/sellerRequest.js';
import twitter from './routes/twitter.js';


export default Router()
	.use('/products', products)
	.use('/sellers', sellers)
	.use('/seller-requests', sellerRequests)
	.use('/twitter', twitter);