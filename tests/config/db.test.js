'use strict';

const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
require('dotenv').config();

// To disable app log
console.log = function () { };

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

const mockgoose = new Mockgoose(mongoose);

// Create the database connection
const connect = () => {
	return new Promise((resolve, reject) => {
		mockgoose.prepareStorage()
			.then(() => {
				mongoose.connect(process.env.MONGODB_URI, options, (err) => {
					if (err) {
						console.err(`DB Error: ${err}`);
						reject(err);
					} else {
						console.log('Mock MongoDB Connected');
						resolve();
					}
				});
			})
	});
};

const close = async () => {
	return await mongoose.disconnect();
};

module.exports = {
	connect,
	close
};
