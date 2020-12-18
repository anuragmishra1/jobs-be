'use strict';

const fs = require('fs');
const path = require('path');
const Services = require('../services');

const applyJob = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({
			status: 'failure',
			message: 'Resume is required'
		});
	}

	const filePath = path.resolve(__dirname, `../../${req.file.path}`);
	const fileBufData = fs.readFileSync(filePath, 'base64');
	fs.unlinkSync(filePath);

	req.body.resume = fileBufData;
	req.body.job_id = req.params.jobId;

	let applicantData = {};

	try {
		applicantData = await Services.applicant.create(req.body);
		await Services.job.update(
			{ _id: req.params.jobId },
			{ $inc: { no_of_applicants: 1 } }
		);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Job applied successfully',
		id: applicantData._id
	});
};

const getApplicants = async (req, res) => {
	let applicants = [];

	const criteria = {
		job_id: req.params.jobId
	};
	const projection = {
		__v: 0,
		resume: 0
	};

	try {
		applicants = await Services.applicant.find(criteria, projection);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: applicants
	});
};

const getApplicantDetail = async (req, res) => {
	let applicantData = {};

	const projection = {
		__v: 0
	};

	try {
		applicantData = await Services.applicant.findById(
			req.params.applicantId,
			projection
		);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: applicantData
	});
};

module.exports = {
	applyJob,
	getApplicants,
	getApplicantDetail
};
