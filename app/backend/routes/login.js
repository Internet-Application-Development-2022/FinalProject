import { Router } from 'express';

import loginController from '../controllers/login.js';

export default Router()
	.all('/*', (req, res, next) => {
		debugger;
		next();
	})
	.get('/register', loginController.registerForm)
	.post('/register', loginController.register)
	.get('/login', loginController.loginForm)
	.post('/login', loginController.login)
	.get('/logout', loginController.logout)
	.get('/', loginController.auth, loginController.adminPage);