import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '../';

let userId;
let riderId;
let adminId;

describe('POST /v1/auth/signup/user', function () {
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
      email: 'jondoe@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(user);
    expect(response.status).to.eql(201);
    expect(JSON.parse(response.text).data.role).to.eql('user');
  });

  it('should login a rider successfully', async function () {
    const rider = {
      email: 'jondoe1@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(rider);
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
    const user = {
      email: 'jondoe2@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app)
      .post('/v1/auth/admin/login')
      .send(user);
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
    const deleteResponse = await supertest(app).delete(`/v1/users/${userId}`);
    expect(deleteResponse.status).to.eql(200);
  }
  if (riderId) {
    const deleteResponse = await supertest(app).delete(`/v1/users/${riderId}`);
    expect(deleteResponse.status).to.eql(200);
  }
  if (adminId) {
    const deleteResponse = await supertest(app).delete(`/v1/admin/${adminId}`);
    expect(deleteResponse.status).to.eql(200);
  }
  process.exit(0);
});
