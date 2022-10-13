import dotenv from 'dotenv';
dotenv.config();

import { mongoose } from 'mongoose';
import { DB_URL } from './config/db.config.js';
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


import express from 'express';
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));


// use router
import apiRouter from './routes.js';
app.use('/api', apiRouter);


import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', soc => {
	// something
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
