'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

// Create the database connection
const connect = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect(process.env.MONGODB_URI, options, (err) => {
			if (err) {
				console.err(`DB Error: ${err}`);
				reject(err);
			} else {
				console.log('MongoDB Connected');
				resolve();
			}
		});
		listeners();
	});
};

const close = async () => {
	return await mongoose.disconnect();
};

const listeners = () => {
	// When connection successfully established
	mongoose.connection.on('connected', function () {
		console.log(
			`Mongoose default connection open to ${process.env.MONGODB_URI}`
		);
	});

	// If the connection throws an error
	mongoose.connection.on('error', function (err) {
		console.error(`Mongoose default connection error: ${err}`);
		process.exit(1);
	});

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose default connection disconnected');
		process.exit(1);
	});
};

module.exports = {
	connect,
	close
};
