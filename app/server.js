console.log(`Starting up backend in ${process.env.PROD ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);

import dotenv from 'dotenv';
dotenv.config();

import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to mongodb
import { mongoose } from 'mongoose';
import { DB_URL } from './backend/config/db.config.js';
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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './backend/views');
app.set('view engine', 'ejs');

// create session
import session from 'express-session';

app.use(session({
	secret: 'foo',
	saveUninitialized: false,
	resave: false
}));

// use routers
import loginRouter from './backend/routes/login.js';
app.use('/', loginRouter);

import apiRouter from './backend/routes.js';
app.use('/api', apiRouter);

// static serve frontend
app.get('/',
	(req, res) => res.sendFile(
		path.join( __dirname, 'frontend', 'index.html')
	)
);

app.use('/shared', express.static('shared'));
app.use('/public', express.static('frontend/public'));

if (!process.env.PROD) {
	console.log('Loading JS map files');
	app.use('/public/source/', express.static('frontend/source'));
}

// create socket.io server
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', soc => {
	console.log(soc.id + ' connected');

	soc.on('advertise', msg => {
		console.log('emitting: ' + msg);
		io.emit('advertise', msg);
	});
});

// set port, run server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
