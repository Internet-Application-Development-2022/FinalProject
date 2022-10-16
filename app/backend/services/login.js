import { createHash } from 'crypto';
import { User } from '../models.js';

const USERNAME_PATTERN = '^[a-zA-Z0-9]{3,64}$';
const PASSWORD_PATTERN = '^[\\p{L}\\p{N}\\p{P}\\p{S} ]{8,64}$';

const usernameRegexp = new RegExp(USERNAME_PATTERN);
const passwordRegexp = new RegExp(PASSWORD_PATTERN, 'u');

export default {
	USERNAME_PATTERN,
	PASSWORD_PATTERN,
	async login(username, password) {
		const user = await User.findOne({
			_id: username,
			password: createHash('sha256').update(password).digest('hex')
		});
		return user !== null;
	},
	async register(username, password) {
		if(!(
			usernameRegexp.exec(username) &&
			passwordRegexp.exec(password)
		)) {
			throw 'Invalid password or username';
		}

		const user = new User({
			_id: username,
			password: password
		});

		return await user.save();
	}
};