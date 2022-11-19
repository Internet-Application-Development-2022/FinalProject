const { TWITTER_BEARER_TOKEN } = process.env;

const TWITTER_URL = 'https://api.twitter.com';
const API_DIR = '/2/tweets/search/recent';

const QUERY_PARAMS = {
	query: '%23amazon',
	expansions: 'author_id',
	'user.fields': 'profile_image_url'
};

const API_URL = new URL(`${API_DIR}?${Object.entries(QUERY_PARAMS).map(ent => `${ent[0]}=${ent[1]}`).join('&')}`, TWITTER_URL);

export default {
	findAll(req, res) {
		fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
			}
		})
			.then(response => response.json())
			.then(data => { res.send(data); })
			.catch(error => {
				res.status(400).send({
					message: error || 'Failed to get tweets'
				});
			});
	}
};