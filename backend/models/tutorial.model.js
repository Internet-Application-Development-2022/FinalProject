import { Schema, mongoose } from 'mongoose';


const TutorialSchema = Schema(
	{
		title: String,
		description: String,
		published: Boolean
	},
	{ timestamps: true }
);

class TutorialClass {
	title;
	description;
	published;

	toJSON() {
		return {
			title: this.title,
			description: this.description,
			published: this.published
		};
	}
}

TutorialSchema.loadClass(TutorialClass);

export const Tutorial = mongoose.model("tutorial", TutorialSchema);