'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		company: { type: String, unique: true, required: true },
		email: { type: String, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['admin'],
			default: 'admin'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('user', userSchema);
