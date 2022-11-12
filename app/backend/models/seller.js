import { Schema, model } from 'mongoose';
import { Seller as SellerClass } from '../entities.js';

const SellerSchema = Schema(
	{
		name: String,
		signature: String,
		email: String,
		phone: String,
		location: {
			type: {
				type: String,
				enum: ['Point'],
				required: true
			},
			coordinates: {
				type: [Number],
				required: true
			}
		}
	},
	{ timestamps: true }
);

SellerSchema.loadClass(SellerClass);

export const Seller = model('Seller', SellerSchema);