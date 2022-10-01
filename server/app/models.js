import mongoose from 'mongoose';

import url from './config/db.config.js';
import { Tutorial } from './models/tutorial.model.js';

mongoose.Promise = global.Promise;

export {
	mongoose,
	url,
	Tutorial,
};

export default {
	mongoose,
	url,
	Tutorial,
};