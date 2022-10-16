import { createHash } from 'crypto';
import { Schema, model } from 'mongoose';

const UserSchema = Schema({
	_id: String,
	password: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	if(this.isModified('password') || this.isNew) {
		this.password = createHash('sha256').update(this.password).digest('hex');
	}
	return next();
});

export const User = model('User', UserSchema);