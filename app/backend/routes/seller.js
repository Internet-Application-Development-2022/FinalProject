import { Router } from 'express';

import seller from '../controllers/seller.js';

export default Router()
	.post('/', seller.create)
	.get('/', seller.findAll)
	.get('/:id', seller.findOne)
	.put('/:id', seller.update)
	.delete('/:id', seller.delete)
	.delete('/', seller.deleteAll);