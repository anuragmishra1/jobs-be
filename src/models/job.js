'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema(
	{
		title: { type: String, trim: true, required: true },
		slug: { type: String, trim: true, required: true, unique: true },
		location: { type: String, trim: true, required: true },
		company_logo: { type: String, required: true },
		company_name: { type: String, trim: true, required: true },
		about_company: { type: String, trim: true, required: true },
		company_website: { type: String, trim: true, required: true },
		responsibilties: { type: String, trim: true, required: true },
		required_experience: { type: String, trim: true, required: true },
		educational_qualification: { type: String, trim: true },
		expired: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
);

jobSchema.index({ slug: 1, company_name: 1 });

module.exports = mongoose.model('job', jobSchema);
