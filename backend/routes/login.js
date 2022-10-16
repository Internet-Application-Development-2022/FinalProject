import { Router } from 'express';

import loginController from '../controllers/login.js';

export default Router()
	.post('/login', loginController.login);