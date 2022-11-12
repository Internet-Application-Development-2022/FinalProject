import { Product } from '../models.js';
import { strToNumber, parseID } from '../utils.js';

export default {
	create(req, res) {
		const parsedRequestBody = {
			seller: req.body.seller,
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
			.save()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the Product.'
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
			.sort({ updatedAt: 'desc' })
			.skip(page * size)
			.limit(size)
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while retrieving Products.'
				});
			});
	},
	findOne(req, res) {
		const id = parseID(req.params);

		if(!id) {
			return res.status(400).send({
				message: 'no id was given'
			});
		}

		let query = Product.findById(id);

		if('seller' in req.query && req.query.seller) {
			query = query
				.populate('seller')
				.exec();
		}

		query
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
		const id = parseID(req.params);

		if(!id) {
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

		const cleanObject = Object
			.entries(parsedRequestBody)
			.filter(ent => ent[1] === undefined || ent[1] == null || Number.isNaN(ent[1]))
			.reduce((obj, arr) => obj[arr[0]] = obj[1], {});

		Product
			.findByIdAndUpdate(id, cleanObject)
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
					message: 'Error updating Product with id=' + id
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
					message: 'Could not delete Product with id=' + id
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
						err.message || 'an error occurred while removing all products.'
				});
			});
	},
	amount(req, res) {
		Product
			.count()
			.then(data => {
				res.send(`${data}`);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'an error occurred while receiving products amount'
				});
			});
	}
};