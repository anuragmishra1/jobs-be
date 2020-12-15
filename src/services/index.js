'use strict';

module.exports = {
	user: require('./mongodb')('user'),
	job: require('./mongodb')('job'),
	applicant: require('./mongodb')('applicant')
};
