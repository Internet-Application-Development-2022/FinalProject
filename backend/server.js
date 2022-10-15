console.log(`Starting up backend in ${process.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

import dotenv from 'dotenv';
dotenv.config();

// connect to mongodb
import { mongoose } from 'mongoose';
import { DB_URL } from './config/db.config.js';
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


// create express app
import express from 'express';
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// create session
import session from 'express-session';

app.use(session({
	secret: 'foo',
	saveUninitialized: false,
	resave: false
}));


// use routers
import apiRouter from './routes.js';
app.use('/api', apiRouter);

import loginRouter from './routes/login.js';
app.use('login', loginRouter);


// create socket.io server
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', soc => {
	// something
});

// set port, run server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
