/* eslint-disable */

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(express.urlencoded({ extended: true }));

// static serve frontend
app.use('/', express.static('public'));

// proxy backend api and websocket
app.use('/api', createProxyMiddleware({
	target: 'http://backend'
}));
app.use(createProxyMiddleware('ws://backend'));

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}.`);
});

/* eslint-enable */