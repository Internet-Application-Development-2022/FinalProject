import { Product } from '../models.js';

function strToNumber(str) {
	return !isNaN(str) ? parseInt(str, 10) : NaN;
}

export default {
	create(req, res) {
		const parsedRequestBody = {
			name: req.body.name,
			price: req.body.price,
			catagory: req.body.catagory,
			img: req.body.img,
			alt: req.body.alt || ''
		};

		const missingKeys = Object
			.entries(parsedRequestBody)
			.filter(ent => ent[1] === undefined || ent[1] == null || Number.isNaN(ent[1]))
			.map(arr => arr[0]);

		// Validate request
		if (missingKeys.length > 0) {
			res.status(400).send({ message: 'Missing keys: ' + missingKeys.join(', ') });
			return;
		}

		const product = new Product(parsedRequestBody);

		product
			.save(product)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the Tutorial.'
				});
			});
	},
	findAll(req, res) {
		const size = 'size' in req.query ? strToNumber(req.query.size) : 0;
		const page = 'page' in req.query ? strToNumber(req.query.page) : 0;

		if(Number.isNaN(size) || Number.isNaN(page)) {
			const badValuesStr = [
				Number.isNaN(size) && 'size',
				Number.isNaN(page) && 'page'
			].join(', ');

			res.status(500).send({
				message: 'Invalid value'
					+ (badValuesStr.length > 1 ? 's' : '') + ': '
					+ badValuesStr
			});
			return;
		}

		Product
			.find()
			.skip(page * size)
			.limit(size)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving tutorials.'
				});
			});
	},
	findOne(req, res) {
		if (!('id' in req.params) || (typeof req.params.id !== 'string' && !(req.params.id instanceof String))) {
			return res.status(400).send({
				message: 'no id was given'
			});
		}

		const id = req.params.id;

		Product
			.findById(id)
			.then(data => {
				if(!data) {
					res.statuse(404).send({
						message: 'couldn\'t find product with id=' + id
					});
				}

				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message: 'couldn\'t find product with id=' + id
				});
				console.log(err);
			});
	},
	update(req, res) {
		if (!('id' in req.params) || (typeof req.params.id !== 'string' && !(req.params.id instanceof String))) {
			return res.status(400).send({
				message: 'no id was given'
			});
		}

		const parsedRequestBody = {
			name: req.body.name,
			price: req.body.price,
			catagory: req.body.catagory,
			img: req.body.img,
			alt: req.body.alt || ''
		};

		const missingKeys = Object
			.entries(parsedRequestBody)
			.filter(ent => ent[1] === undefined || ent[1] == null || Number.isNaN(ent[1]))
			.map(arr => arr[0]);

		// Validate request
		if (missingKeys.length > 0) {
			res.status(400).send({ message: 'Missing keys: ' + missingKeys.join(', ') });
			return;
		}

		const id = req.params.id;

		Product
			.findByIdAndUpdate(id, parsedRequestBody)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot update Product with id=' + id
					});
					return;
				}
				res.send({ message: 'Product was updated successfully.' });
			})
			.catch(err => {
				res.status(500).send({
					message: 'Error updating Tutorial with id=' + id
				});
				console.log(err);
			});
	},
	delete(req, res) {
		if (!('id' in req.params) || (typeof req.params.id !== 'string' && !(req.params.id instanceof String))) {
			return res.status(400).send({
				message: 'no id was given'
			});
		}

		const id = req.params.id;

		Product
			.findByIdAndRemove(id)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot delete product with id=' + id
					});
					return;
				}

				res.send({
					message: 'product was deleted successfully!'
				});
			})
			.catch(err => {
				res.status(500).send({
					message: 'Could not delete Tutorial with id=' + id
				});
				console.log(err);
			});
	},
	deleteAll(req, res) {
		Product
			.deleteMany()
			.then(data => {
				res.send({
					message: `${data.deletedCount} products were deleted successfully!`
				});
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while removing all tutorials.'
				});
			});
	}
};