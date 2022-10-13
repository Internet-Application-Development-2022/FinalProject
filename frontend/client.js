/* eslint-disable */
console.log(`Starting up frontend in ${process.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(express.urlencoded({ extended: false }));

// static serve frontend
app.use('/', express.static('src'));

if (!process.env.PROD) {
	console.log('Loading JS map files');
	app.use('/public/source/', express.static('source'));
}

// proxy backend api and websocket
app.use('/api', createProxyMiddleware({
	target: 'http://backend'
}));
app.use(createProxyMiddleware('ws://backend'));

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

/* eslint-enable */