import { Schema, mongoose } from 'mongoose';
import { Product as ProductClass } from '../entities.js';

const ProductSchema = Schema(
	{
		name: String,
		price: Number,
		catagory: String,
		img: String,
		alt: String
	},
	{ timestamps: true }
);

ProductSchema.loadClass(ProductClass);

export const Product = mongoose.model('product', ProductSchema);