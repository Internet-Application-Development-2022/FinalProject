import { User } from '../models.js';

export async function login(username, password) {
	const user = await User.findOne({ _id: username, password });
	return user !== null;
}

export async function register(username, password) {
	const user = new User({
		_id: username,
		password: password
	});

	return await user.save();
}