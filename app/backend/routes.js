import { Router } from 'express';

import products from './routes/product.js';


export default Router()
	.use('/products', products);