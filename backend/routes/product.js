import { Router } from 'express';

import products from '../controllers/product.js';

export default Router()
	.post('/', products.create)
	.get('/', products.findAll)
	.get('/:id', products.findOne)
	.put('/:id', products.update)
	.delete('/:id', products.delete)
	.delete('/', products.deleteAll);