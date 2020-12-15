'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
	{
		name: { type: String, trim: true, required: true },
		email: { type: String, trim: true, required: true },
		phone: { type: String, trim: true },
		resume: { type: String, required: true },
		job_id: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

applicantSchema.index('job_id');

module.exports = mongoose.model('applicant', applicantSchema);
