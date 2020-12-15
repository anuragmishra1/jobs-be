'use strict';

const Joi = require('joi');

const user = {
	login: Joi.object()
		.keys({
			email: Joi.string().email().required(),
			password: Joi.string().required()
		})
		.required(),

	createUser: Joi.object()
		.keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			company: Joi.string().required(),
			email: Joi.string().email().required(),
			password: Joi.string().required(),
			role: Joi.string().valid('admin').default('admin')
		})
		.required(),

	updateUser: Joi.object()
		.keys({
			first_name: Joi.string().required(),
			last_name: Joi.string().required(),
			role: Joi.string().valid('admin').default('admin')
		})
		.required(),

	getUserId: Joi.object()
		.keys({
			id: Joi.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.message('Invalid id provided')
				.required()
		})
		.required()
};

const job = {
	createJob: Joi.object()
		.keys({
			title: Joi.string().required(),
			location: Joi.string().required(),
			company_website: Joi.string().required(),
			about_company: Joi.string().required(),
			responsibilties: Joi.string().required(),
			required_experience: Joi.string().required(),
			educational_qualification: Joi.string()
		})
		.required(),

	updateJob: Joi.object()
		.keys({
			title: Joi.string().required(),
			location: Joi.string().required(),
			company_website: Joi.string().required(),
			about_company: Joi.string().required(),
			responsibilties: Joi.string().required(),
			required_experience: Joi.string().required(),
			educational_qualification: Joi.string(),
			expired: Joi.boolean().default(false)
		})
		.required(),

	getJobId: Joi.object()
		.keys({
			id: Joi.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.message('Invalid id provided')
				.required()
		})
		.required(),

	getJobBySlug: Joi.object()
		.keys({
			slug: Joi.string().required()
		})
		.required(),

	applyJob: Joi.object()
		.keys({
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			phone: Joi.string().required(),
			job_id: Joi.string().required()
		})
		.required(),

	getApplyingJobId: Joi.object()
		.keys({
			jobId: Joi.string()
				.regex(/^[0-9a-fA-F]{24}$/)
				.message('Invalid id provided')
				.required()
		})
		.required()
};

module.exports = {
	user,
	job
};
