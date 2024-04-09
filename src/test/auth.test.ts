import { expect } from 'chai';
import { describe, it } from 'node:test';
import supertest from 'supertest';
import app from '../';

describe('POST /signup/user/', function () {
  it('should sign up a new user successfully', async function () {
    const user = {
      email: 'jondoe@email.com',
      firstname: 'Alfa 5',
      lastname: 'Smart bot',
      password: 'notarealpassword10',
      phone: '081234',
      gender: 'male',
    };
    const response = await supertest(app)
      .post('/signup/user')
      .send(user);
    expect(response.status).to.eql(201);
  });
});
