import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '..';

let userId;
let adminId;
let adminToken;
let userToken;

describe('POST /v1/auth/signup/admin', function () {
  it('should signup an admin successfully', async function () {
    const admin = {
      email: 'jondoe20@email.com',
      firstname: 'Alfa 5',
      lastname: 'Smart bot',
      password: 'notarealpassword10',
    };
    const response = await supertest(app)
      .post('/v1/auth/signup/admin')
      .send(admin);

    adminId = JSON.parse(response.text).data._id;
    expect(response.status).to.eql(201);
  });
});

describe('POST /v1/auth/admin/login', function () {
  it('should login an admin successfully', async function () {
    const admin = {
      email: 'jondoe20@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app)
      .post('/v1/auth/admin/login')
      .send(admin);
    adminToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
  });
});

describe('GET /v1/admin/riders', function () {
  it('should get all riders', async function () {
    const response = await supertest(app).get('/v1/admin/riders').set({
      'x-auth-token': adminToken,
    });
    expect(response.status).to.eql(200);
  });
});

describe('GET /v1/admin/users', function () {
  it('should get all users', async function () {
    const response = await supertest(app).get('/v1/admin/users').set({
      'x-auth-token': adminToken,
    });
    expect(response.status).to.eql(200);
  });
});

describe('PATCH /v1/admin/users/suspend', function () {
  it('should sign up a new user successfully', async function () {
    const user = {
      email: 'jondoe10@email.com',
      firstname: 'Alfa 5',
      lastname: 'Smart bot',
      password: 'notarealpassword10',
      phone: '081234',
      gender: 'male',
    };

    const response = await supertest(app)
      .post('/v1/auth/signup/user')
      .send(user);
    userId = JSON.parse(response.text).data._id;
    expect(response.status).to.eql(201);
  });

  it('should login a user successfully', async function () {
    const user = {
      email: 'jondoe10@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(user);
    userToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
    expect(JSON.parse(response.text).data.role).to.eql('user');
  });

  it('should suspend created user', async function () {
    const user = {
      userId,
    };
    const response = await supertest(app)
      .patch('/v1/admin/users/suspend')
      .set({
        'x-auth-token': adminToken,
      })
      .send(user);
    expect(response.status).to.eql(200);
  });

  it('should change status of verified user', async function () {
    const response = await supertest(app).get(`/v1/user/${userId}`).set({
      'x-auth-token': userToken,
    });
    expect(response.status).to.eql(200);
    expect(JSON.parse(response.text).data.isActive).to.eql(false);
  });
});

after(async function () {
  if (adminId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/admin/${adminId}`)
      .set({
        'x-auth-token': adminToken,
      });
    expect(deleteResponse.status).to.eql(200);
  }
  if (userId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/user/${userId}`)
      .set({
        'x-auth-token': userToken,
      });
    expect(deleteResponse.status).to.eql(200);
  }
  process.exit(0);
});
