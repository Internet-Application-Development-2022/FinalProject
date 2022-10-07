/* eslint-disable */
import express from 'express';
// import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
/*
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// static serve frontend
app.use(express.static('src'));
app.use('/public', express.static('public'));
app.use('/api', createProxyMiddleware({
	target: 'http://backend',
	pathRewrite: { '^/api': '' }
}));


// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}.`);
});

/* eslint-enable */