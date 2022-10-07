import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

import { mongoose } from 'mongoose';
import { DB_URL } from './config/db.config.js';
import apiRouter from './routes.js';


const app = express();

var corsOptions = {
	origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
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
app.use(apiRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
