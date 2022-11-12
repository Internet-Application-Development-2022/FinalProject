import { Router } from 'express';

import sellerRequest from '../controllers/sellerRequest.js';

export default Router()
	.get('/status', sellerRequest.status)
	.post('/', sellerRequest.create)
	.get('/', sellerRequest.findAll)
	.get('/:id', sellerRequest.findOne)
	.put('/:id', sellerRequest.update)
	.delete('/:id', sellerRequest.delete)
	.delete('/', sellerRequest.deleteAll);