import { Seller } from '../models.js';
import { parseID, strToNumber } from '../utils.js';

const BAD_VALUES = [
	'name',
	'signature',
	'email',
	'phone'
];

function parseRequestParams(body) {
	const badValues = BAD_VALUES.filter(key => !(
		key in body && (
			typeof body[key] === 'string' ||
			body[key] instanceof String
		)
	));

	if(!(
		'location' in body &&
		Array.isArray(body.location) &&
		body.location.length === 2 &&
		body.location.every(e => typeof e === 'number' || e instanceof Number)
	)) {
		badValues.push('location');
	}

	if(badValues.length > 0) {
		return [false, badValues];
	}

	return [
		{
			name: body.name,
			signature: body.signature,
			email: body.email,
			phone: body.phone,
			location: {
				type: 'Point',
				coordinates: body.location
			}
		},
		badValues
	];
}

export default {
	create(req, res) {
		const [parsedRequestParams, badValues] = parseRequestParams(req.body);

		if(!parsedRequestParams) {
			res.status(400).send({ message: 'bad values for keys: ' + badValues.join(', ') });
			return;
		}

		const seller = new Seller(parsedRequestParams);

		seller
			.save()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the Seller.'
				});
			});
	},
	findAll(req, res) {
		const minDateAdded = 'minDateAdded' in req.query ? strToNumber(req.query.minDateAdded) : null;
		const maxDateAdded = 'maxDateAdded' in req.query ? strToNumber(req.query.maxDateAdded) : null;

		const query = {};

		if(minDateAdded !== null || maxDateAdded !== null) {
			query.createdAt = {};
		}

		if(minDateAdded !== null) {
			query.createdAt.$gte = new Date(minDateAdded);
		}

		if(maxDateAdded !== null) {
			query.createdAt.$lte = new Date(maxDateAdded);
		}

		Seller
			.find(query)
			.then(sellers => {
				if(sellers !== null) {
					res.send(sellers);
				} else {
					res.status(400).send({ message: 'No sellers found' });
				}
			})
			.catch(err => res.status(500).send({ message: err || 'error finding sellers' }));
	},
	findOne(req, res) {
		const id = parseID(req.params);

		if(!id) {
			res.status(400).send({
				message: 'no id was given'
			});
			return;
		}

		Seller
			.findById(id)
			.then(sellers => {
				if(sellers !== null) {
					res.send(sellers);
				} else {
					res.status(400).send({ message: 'No sellers found' });
				}
			})
			.catch(err => res.status(500).send({ message: err || 'error finding seller' }));
	},
	update(req, res) {
		const id = parseID(req.params);

		if(!id) {
			res.status(400).send({
				message: 'no id was given'
			});
			return;
		}

		const parsedRequestParams = {
			name: req.body.name,
			signature: req.body.signature,
			email: req.body.email,
			phone: req.body.phone,
			location: {
				type: 'Point',
				coordinates: req.body.location
			}
		};

		for(let key in parsedRequestParams) {
			if(parsedRequestParams[key] === undefined) {
				delete parsedRequestParams[key];
			}
		}

		if(parsedRequestParams.location.coordinates === undefined) {
			delete parsedRequestParams['location'];
		}

		Seller.
			findByIdAndUpdate(id, parsedRequestParams)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot update Seller with id=' + id
					});
					return;
				}
				res.send({ message: 'Seller was updated successfully.' });
			})
			.catch(err => {
				res.status(500).send({
					message: 'Error updating Seller with id=' + id
				});
				console.log(err);
			});
	},
	delete(req, res) {
		const id = parseID(req.params);

		if(!id) {
			res.status(400).send({
				message: 'no id was given'
			});
			return;
		}

		Seller
			.findByIdAndRemove(id)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot delete seller with id=' + id
					});
					return;
				}

				res.send({
					message: 'seller was deleted successfully!'
				});
			})
			.catch(err => {
				res.status(500).send({
					message: 'Could not delete seller with id=' + id
				});
				console.log(err);
			});
	},
	deleteAll(req, res) {
		Seller
			.deleteMany()
			.then(data => {
				res.send({
					message: `${data.deletedCount} sellers were deleted successfully!`
				});
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'an error occurred while removing all sellers.'
				});
			});
	},
};