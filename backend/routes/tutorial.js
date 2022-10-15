import { Router } from 'express';

import tutorials from '../controllers/tutorial.js';

/*
const router = Router();

// Create a new Tutorial
router.post('/', tutorials.create);

// Retrieve all Tutorials
router.get('/', tutorials.findAll);

// Retrieve all published Tutorials
router.get('/published', tutorials.findAllPublished);

// Retrieve a single Tutorial with id
router.get('/:id', tutorials.findOne);

// Update a Tutorial with id
router.put('/:id', tutorials.update);

// Delete a Tutorial with id
router.delete('/:id', tutorials.delete);

// Create a new Tutorial
router.delete('/', tutorials.deleteAll);
*/

export default Router()
	.post('/', tutorials.create)
	.get('/', tutorials.findAll)
	.get('/published', tutorials.findAllPublished)
	.get('/:id', tutorials.findOne)
	.put('/:id', tutorials.update)
	.delete('/:id', tutorials.delete)
	.delete('/', tutorials.deleteAll);