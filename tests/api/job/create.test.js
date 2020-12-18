'use strict';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/server');
const { connect, close } = require('../../config/db.test');

let TOKEN = null;

describe('Create Job - /v1/job', () => {
	before((done) => {
		connect()
			.then(() => done())
			.catch((err) => done(err));
	});

	after((done) => {
		close()
			.then(() => done())
			.catch((err) => done(err));
	});

	it('OK, should create a new job', async () => {
		await createUser();
		await doLogin();

		let jobData = {
			title: "Sr. Software Developer",
			location: "Bangalore",
			company_name: "Google",
			company_website: "https://google.com",
			about_company: "Company is in technology space",
			responsibilties: "You should be good in problem solving",
			required_experience: "Good experience with nodeJS",
			job_description: "Qualification doesn't matter if you have a good skills",
			technologies: [
				"NodeJS",
				"VueJS"
			]
		};
		const res = await request(app)
			.post('/v1/job')
			.set('Authorization', `Bearer ${TOKEN}`)
			.send(jobData);
		expect(res.statusCode).equal(200);
		expect(res.body).to.have.property('id');
	});

	it('Fail, job title is required to create a job', async () => {
		let jobData = {
			location: "Bangalore",
			company_name: "Google",
			company_website: "https://google.com",
			about_company: "Company is in technology space",
			responsibilties: "You should be good in problem solving",
			required_experience: "Good experience with nodeJS",
			job_description: "Qualification doesn't matter if you have a good skills",
			technologies: [
				"NodeJS",
				"VueJS"
			]
		};
		const res = await request(app)
			.post('/v1/job')
			.set('Authorization', `Bearer ${TOKEN}`)
			.send(jobData);
		expect(res.statusCode).equal(422);
		expect(res.body).to.have.property('error');
	});
});

const createUser = () => {
	return new Promise(async (resolve, reject) => {
		let userData = {
			first_name: "Test",
			last_name: "User",
			company: "Job Company",
			email: "job@company.com",
			password: "password"
		};
		await request(app)
			.post('/v1/user')
			.send(userData);
		resolve();
	});
};

const doLogin = () => {
	return new Promise(async (resolve, reject) => {
		let loginData = {
			email: "job@company.com",
			password: "password"
		};
		const res = await request(app)
			.post('/v1/user/login')
			.send(loginData);

		TOKEN = res.body.token;
		resolve();
	});
};
