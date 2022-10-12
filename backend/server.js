import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
const app = express();

import session from 'express-session';
app.use(session({
	secret: 'foo',
	saveUninitialized: false,
	resave: false
}));

import helmet from 'helmet';
app.use(helmet());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// connect to mongodb
import { DB_URL } from './config/db.config.js';
import { mongoose } from 'mongoose';
mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to the database!');
	})
	.catch(err => {
		console.log('Cannot connect to the database!', err);
		process.exit();
	});

// use router
import apiRouter from './routes.js';
app.use(apiRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
