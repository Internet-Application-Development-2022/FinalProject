import { SellerRequest } from '../models.js';
import { parseID, strToNumber } from '../utils.js';

const BAD_VALUES = [
	'name',
	'signature',
	'email',
	'phone',
	'text'
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
		return false;
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
			},
			text: body.text,
			status: 'Pending'
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

		const seller = new SellerRequest(parsedRequestParams);

		seller
			.save()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'Some error occurred while creating the SellerRequest.'
				});
			});
	},
	findAll(req, res) {
		const minDateAdded = 'minDateAdded' in req.query ? strToNumber(req.query.minDateAdded) : null;
		const maxDateAdded = 'maxDateAdded' in req.query ? strToNumber(req.query.maxDateAdded) : null;
		const status = 'status' in req.query ? req.query.status : null;

		const query = {};

		if(minDateAdded || maxDateAdded) {
			query.createdAt = {};
		}

		if(minDateAdded) {
			query.createdAt.$gte = new Date(minDateAdded);
		}

		if(maxDateAdded) {
			query.createdAt.$lte = new Date(maxDateAdded);
		}

		if(status) {
			query.status = {
				$eq: encodeURI(status)
			};
		}

		SellerRequest
			.find(query)
			.then(sellers => {
				if(sellers !== null) {
					res.send(sellers);
				} else {
					res.status(400).send({ message: 'No seller Requests found' });
				}
			})
			.catch(err => res.status(500).send({ message: err || 'error finding seller requests' }));
	},
	findOne(req, res) {
		const id = parseID(req.params);

		if(!id) {
			res.status(400).send({
				message: 'no id was given'
			});
			return;
		}

		SellerRequest
			.findById(id)
			.then(sellers => {
				if(sellers !== null) {
					res.send(sellers);
				} else {
					res.status(400).send({ message: 'No seller request found' });
				}
			})
			.catch(err => res.status(500).send({ message: err || 'error finding seller request' }));
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
			},
			text: req.body.text,
			status: req.body.status
		};

		for(let key in parsedRequestParams) {
			if(parsedRequestParams[key] === undefined) {
				delete parsedRequestParams[key];
			}
		}

		if(parsedRequestParams.location.coordinates === undefined) {
			delete parsedRequestParams['location'];
		}

		SellerRequest.
			findByIdAndUpdate(id, parsedRequestParams)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot update Seller Request with id=' + id
					});
					return;
				}
				res.send({ message: 'Seller Request was updated successfully.' });
			})
			.catch(err => {
				res.status(500).send({
					message: 'Error updating Seller Request with id=' + id
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

		SellerRequest
			.findByIdAndRemove(id)
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot delete seller request with id=' + id
					});
					return;
				}

				res.send({
					message: 'seller request was deleted successfully!'
				});
			})
			.catch(err => {
				res.status(500).send({
					message: 'Could not delete seller request with id=' + id
				});
				console.log(err);
			});
	},
	deleteAll(req, res) {
		SellerRequest
			.deleteMany()
			.then(data => {
				res.send({
					message: `${data.deletedCount} seller request were deleted successfully!`
				});
			})
			.catch(err => {
				res.status(500).send({
					message:
						err.message || 'an error occurred while removing all seller requests.'
				});
			});
	},
	status(req, res) {
		SellerRequest
			.aggregate([
				{
					$group: { _id: '$status', quantity: {$sum: 1} }
				}
			])
			.then(data => {
				if (!data) {
					res.status(404).send({
						message: 'Cannot find seller request statuses'
					});
					return;
				}
				res.send(data);
			});
	}
};