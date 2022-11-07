import { Router } from 'express';

import twitter from '../controllers/twitter.js';

export default Router()
	.get('/', twitter.findAll);