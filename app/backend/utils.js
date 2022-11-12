

export function strToNumber(str) {
	return !isNaN(str) ? parseInt(str, 10) : NaN;
}

export function parseID(params) {
	if (!('id' in params) || (typeof params.id !== 'string' && !(params.id instanceof String))) {
		return null;
	}

	return params.id;
}
