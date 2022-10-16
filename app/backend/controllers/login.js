import loginService from '../services/login.js';

export default {
	isLoggedIn(req, res, next) {
		if(req.session.username) {
			next();
		} else {
			res.redirect('/login');
		}
	},
	async register(req, res) {
		const { username, password } = req.body;

		try {
			await loginService.register(username, password);
			req.session.username = username;
			res.redirect('/admin');
		}
		catch (e) {
			res.redirect('/register?error=1');
		}
	},
	async login(req, res) {
		const { username, password } = req.body;

		if (await loginService.login(username, password)) {
			req.session.username = username;
			res.redirect('/admin');
		}
		else {
			res.redirect('/login?error=1');
		}
	},
	logout(req, res) {
		req.session.destroy(() => {
			res.redirect('/');
		});
	},
	registerForm(req, res) {
		res.render('register', {
			usernamePattern: loginService.USERNAME_PATTERN,
			passwordPattern: loginService.PASSWORD_PATTERN,
			error: !!req.query.error
		});
	},
	loginForm(req, res) {
		res.render('login', {
			usernamePattern: loginService.USERNAME_PATTERN,
			passwordPattern: loginService.PASSWORD_PATTERN,
			error: !!req.query.error
		});
	},
	adminPage(req, res) {
		res.render('admin', { username: req.session.username });
	}
};