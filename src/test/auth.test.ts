import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '../index';

let userId;
let riderId;
let adminId;
let userToken;
let adminToken;
let riderToken;

describe('POST /v1/auth/signup/user', function () {
  it('should sign up a new user successfully', async function () {
    const user = {
      email: 'jondoe11@email.com',
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
});

describe('POST /v1/auth/signup/rider', function () {
  it('should signup a rider successfully', async function () {
    const rider = {
      email: 'jondoe1@email.com',
      firstname: 'Alfa 5',
      lastname: 'Smart bot',
      password: 'notarealpassword10',
      phone: '081234',
      gender: 'male',
      vehicle: {
        vehicleName: 'Toyota',
        vehicleId: '12345',
      },
    };
    const response = await supertest(app)
      .post('/v1/auth/signup/rider')
      .send(rider);
    riderId = JSON.parse(response.text).data._id;
    expect(response.status).to.eql(201);
  });
});

describe('POST /v1/auth/login', function () {
  it('should login a user successfully', async function () {
    const user = {
      email: 'jondoe11@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(user);
    userToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
    expect(JSON.parse(response.text).data.role).to.eql('user');
  });

  it('should login a rider successfully', async function () {
    const rider = {
      email: 'jondoe1@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(rider);
    riderToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
    expect(JSON.parse(response.text).data.role).to.eql('rider');
  });
});

describe('POST /v1/auth/signup/admin', function () {
  it('should signup an admin successfully', async function () {
    const admin = {
      email: 'jondoe2@email.com',
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
      email: 'jondoe2@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app)
      .post('/v1/auth/admin/login')
      .send(admin);
    adminToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
  });
});

describe('POST /v1/auth/password-reset', function () {
  it('should change password successfully', async function () {
    const user = {
      email: 'jondoe@email.com',
      password: 'notarealpassword11',
      confirmPassword: 'notarealpassword11',
    };
    const response = await supertest(app)
      .post('/v1/auth/password-reset')
      .send(user);
    expect(response.status).to.eql(200);
  });
});

after(async function () {
  if (userId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/user/${userId}`)
      .set({
        'x-auth-token': userToken,
      });
    expect(deleteResponse.status).to.eql(200);
  }
  if (riderId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/user/${riderId}`)
      .set({
        'x-auth-token': riderToken,
      });
    expect(deleteResponse.status).to.eql(200);
  }
  if (adminId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/admin/${adminId}`)
      .set({
        'x-auth-token': adminToken,
      });
    expect(deleteResponse.status).to.eql(200);
  }
  process.exit(0);
});
