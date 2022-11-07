import { Router } from 'express';

import products from './routes/product.js';
import sellers from './routes/seller.js';


export default Router()
	.use('/products', products)
	.use('/sellers', sellers);