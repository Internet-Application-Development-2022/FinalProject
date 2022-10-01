import { mongoose } from '../models.js';

export const Tutorial = mongoose.model(
	"tutorial",
	mongoose.Schema(
		{
			title: String,
			description: String,
			published: Boolean
		},
		{ timestamps: true }
	)
);