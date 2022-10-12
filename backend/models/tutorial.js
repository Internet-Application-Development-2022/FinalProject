import { Schema, mongoose } from 'mongoose';
import { Tutorial as TutorialClass } from '../../entities/tutorial';

const TutorialSchema = Schema(
	{
		title: String,
		description: String,
		published: Boolean
	},
	{ timestamps: true }
);

TutorialSchema.loadClass(TutorialClass);

export const Tutorial = mongoose.model('tutorial', TutorialSchema);