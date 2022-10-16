import { Router } from 'express';

import loginController from '../controllers/login.js';

export default Router()
	.get('/register', loginController.registerForm)
	.post('/register', loginController.register)
	.get('/login', loginController.loginForm)
	.post('/login', loginController.login)
	.get('/logout', loginController.logout)
	.get('/admin', loginController.isLoggedIn, loginController.adminPage);