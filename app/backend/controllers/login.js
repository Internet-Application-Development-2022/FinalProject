import * as loginService from '../services/login.js';

export default {
	auth(req, res, next) {
		if(req.session.username) {
			next();
			return;
		}
		res.redirect(req.baseUrl + '/login');
	},
	async register(req, res) {
		const { username, password } = req.body;

		try {
			await loginService.register(username, password);
			req.session.username = username;
			res.redirect(req.baseUrl);
		}
		catch (e) {
			res.redirect(req.path + '?error=1');
		}
	},
	async login(req, res) {
		const { username, password } = req.body;

		if (await loginService.login(username, password)) {
			req.session.username = username;
			res.redirect(req.baseUrl);
		}
		else {
			res.redirect(req.path + '?error=1');
		}
	},
	logout(req, res) {
		req.session.destroy(() => {
			res.redirect('/');
		});
	},
	registerForm(req, res) {
		res.render('register', {});
	},
	loginForm(req, res) {
		res.render('login', {});
	},
	adminPage(req, res) {
		res.render('admin', {});
	}
};