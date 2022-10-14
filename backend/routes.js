import { Router } from 'express';

import tutorials from './routes/tutorial.js';
import products from './routes/product.js';


export default Router()
	.use('/tutorials', tutorials)
	.use('/products', products);