import { Schema, model } from 'mongoose';
import { SellerRequest as SellerRequestClass } from '../entities.js';

const SellerRequestSchema = Schema(
	{
		name: String,
		signature: String,
		email: String,
		phone: String,
		location: {
			coordinates: {
				type: [Number],
				required: true
			}
		},
		text: String,
		status: String
	},
	{ timestamps: true }
);

SellerRequestSchema.loadClass(SellerRequestClass);

export const SellerRequest = model('SellerRequest', SellerRequestSchema);