'use strict';

const request = require('supertest');
const { expect } = require('chai');
const app = require('../../../src/server');
const { connect, close } = require('../../config/db.test');

describe('Create User - /v1/user', () => {
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

	it('OK, should create a new user', async () => {
		let data = {
			first_name: "Test",
			last_name: "User",
			company: "Test Company",
			email: "test@company.com",
			password: "password"
		};
		const res = await request(app)
			.post('/v1/user')
			.send(data);
		expect(res.statusCode).equal(200);
	});

	it('Fail, email is required to create a user', async () => {
		let data = {
			first_name: "Test",
			last_name: "User",
			company: "Test Company",
			password: "password"
		};

		const res = await request(app)
			.post('/v1/user')
			.send(data);
		expect(res.body).to.have.property('error');
	});
});
