'use strict';

const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');
const Services = require('../services');

const create = async (req, res) => {
	if (!req.file) {
		return res.status(400).json({
			status: 'failure',
			message: 'Company logo is required'
		});
	}

	const filePath = path.resolve(__dirname, `../../${req.file.path}`);
	const fileBufData = fs.readFileSync(filePath, 'base64');
	fs.unlinkSync(filePath);

	req.body.company_logo = fileBufData;
	req.body.company_name = req.userData.company;
	const company = req.userData.company.replace(/ /g, '-').toLowerCase();
	const title = req.body.title.replace(/ /g, '-').toLowerCase();
	req.body.slug = `${company}-${title}-${nanoid(5)}`;
	req.body.technologies = JSON.parse(req.body.technologies);

	let jobData = {};

	try {
		jobData = await Services.job.create(req.body);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Job created successfully',
		id: jobData._id
	});
};

const update = async (req, res) => {
	let jobData = {};

	try {
		jobData = await Services.job.findById(req.params.id);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	if (!jobData) {
		return res.status(400).json({
			status: 'failure',
			message: 'Job Id not exists'
		});
	}

	if (req.file) {
		const filePath = path.resolve(__dirname, `../../${req.file.path}`);
		const fileBufData = fs.readFileSync(filePath, 'base64');
		req.body.company_logo = fileBufData;
		fs.unlinkSync(filePath);
	}

	if (req.body.title) {
		const company = req.userData.company.replace(/ /g, '-').toLowerCase();
		const title = req.body.title.replace(/ /g, '-').toLowerCase();
		req.body.slug = `${company}-${title}-${nanoid(5)}`;
	}

	if (req.body.technologies) {
		req.body.technologies = JSON.parse(req.body.technologies);
	}

	const criteria = {
		_id: req.params.id
	};

	try {
		await Services.job.update(criteria, req.body, {});
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Job updated successfully'
	});
};

const getAll = async (req, res) => {
	let jobs = [];

	let criteria = {
		company_name: req.userData.company
	};
	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0,
		company_logo: 0
	};

	try {
		jobs = await Services.job.find(criteria, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: jobs
	});
};

const getAllJobs = async (req, res) => {
	let jobs = [];

	const options = {
		limit: req.query.limit || 0,
		skip: req.query.skip || 0
	};
	const projection = {
		__v: 0
	};
	let criteria = {};
	if (req.query.technology) {
		if (typeof req.query.technology === 'string') {
			criteria = {
				technologies: { $in: [req.query.technology] }
			};
		} else {
			criteria = {
				technologies: { $in: req.query.technology }
			};
		}
	}

	try {
		jobs = await Services.job.find(criteria, projection, options);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: jobs
	});
};

const getDetail = async (req, res) => {
	let jobData = {};
	const projection = {
		__v: 0
	};

	try {
		jobData = await Services.job.findById(req.params.id, projection);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: jobData
	});
};

const getDetailBySlug = async (req, res) => {
	let jobData = {};

	const criteria = {
		slug: req.params.slug
	};
	const projection = {
		__v: 0
	};

	try {
		jobData = await Services.job.findOne(criteria, projection);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		data: jobData
	});
};

const remove = async (req, res) => {
	const criteria = {
		_id: req.params.id
	};

	try {
		await Services.job.deleteOne(criteria);
	} catch (err) {
		return res.status(400).json({
			status: 'failure',
			message: err.message
		});
	}

	res.status(200).json({
		status: 'success',
		message: 'Job deleted successfully'
	});
};

module.exports = {
	create,
	update,
	getAll,
	getAllJobs,
	getDetail,
	getDetailBySlug,
	remove
};
