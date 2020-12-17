'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
	dest: 'uploads/',
	limits: {
		fieldSize: 25 * 1024 * 1024
	}
});

const { user, job, applicant } = require('./controllers');
const { auth, validation, schema } = require('./utils');

// User Routes
router.post('/user/login', validation.body(schema.user.login), user.login);
router.get('/users', auth.checkAuth, user.getAll);
router.get(
	'/user/:id',
	auth.checkAuth,
	validation.params(schema.user.getUserId),
	user.getDetail
);
router.post('/user', validation.body(schema.user.createUser), user.create);
router.put(
	'/user/:id',
	auth.checkAuth,
	validation.body(schema.user.updateUser),
	validation.params(schema.user.getUserId),
	user.update
);
router.delete(
	'/user/:id',
	validation.params(schema.user.getUserId),
	user.remove
);

// Jobs Routes
router.get('/jobs/all', job.getAllJobs);
router.get('/jobs', auth.checkAuth, job.getAll);
router.get(
	'/job/:id',
	auth.checkAuth,
	validation.params(schema.job.getJobId),
	job.getDetail
);
router.get(
	'/job/slug/:slug',
	validation.params(schema.job.getJobBySlug),
	job.getDetailBySlug
);
router.post(
	'/job',
	auth.checkAuth,
	validation.body(schema.job.createJob),
	job.create
);
router.put(
	'/job/:id',
	auth.checkAuth,
	validation.body(schema.job.updateJob),
	validation.params(schema.job.getJobId),
	job.update
);
router.delete(
	'/job/:id',
	auth.checkAuth,
	validation.params(schema.job.getJobId),
	job.remove
);
router.post(
	'/job/:jobId/logo',
	auth.checkAuth,
	upload.single('company_logo'),
	validation.params(schema.job.getApplyingJobId),
	job.uploadLogo
);

router.post(
	'/job/:jobId/apply',
	upload.single('resume'),
	validation.body(schema.job.applyJob),
	validation.params(schema.job.getApplyingJobId),
	applicant.applyJob
);
router.get(
	'/job/:jobId/applicants',
	auth.checkAuth,
	validation.params(schema.job.getApplyingJobId),
	applicant.getApplicants
);
router.get(
	'/job/:jobId/applicant/:applicantId',
	auth.checkAuth,
	validation.params(schema.job.applicantDetail),
	applicant.getApplicantDetail
);

module.exports = router;
