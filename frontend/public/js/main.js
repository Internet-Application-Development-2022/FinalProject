import $ from './jquery.js';
import { io } from "socket.io-client";

$(() => {
	const socket = io();
	console.log('ready');
	console.log(socket);
})