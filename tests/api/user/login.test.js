'use strict';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/server');
const { connect, close } = require('../../config/db.test');

describe('Login User - /v1/user/login', () => {
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

	it('OK, should able to login with valid user credentials', async () => {
		let userData = {
			first_name: "Test",
			last_name: "User",
			company: "Test Company",
			email: "test@company.com",
			password: "password"
		};
		await request(app)
			.post('/v1/user')
			.send(userData);

		let loginData = {
			email: "test@company.com",
			password: "password"
		};
		const res = await request(app)
			.post('/v1/user/login')
			.send(loginData);
		expect(res.statusCode).equal(200);
		expect(res.body).to.contain.property('token');
	});

	it('Fail, credentails incorrect', async () => {
		let loginData = {
			email: "test2@company.com",
			password: "password"
		};

		const res = await request(app)
			.post('/v1/user/login')
			.send(loginData);
		expect(res.statusCode).equal(401);
	});
});
