import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '..';

let userId;
let userToken;

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

describe('POST /v1/auth/login', function () {
  it('should login a user successfully', async function () {
    const user = {
      email: 'jondoe@email.com',
      password: 'notarealpassword10',
    };
    const response = await supertest(app).post('/v1/auth/login').send(user);
    userToken = JSON.parse(response.text).data.token;
    expect(response.status).to.eql(201);
    expect(JSON.parse(response.text).data.role).to.eql('user');
  });
});

describe('GET /v1/user/:id', function () {
  it('should get details of logged in user', async function () {
    const response = await supertest(app).get(`/v1/user/${userId}`).set({
      'x-auth-token': userToken,
    });
    expect(response.status).to.eql(200);
  });
});

describe('PUT /v1/user/:id', function () {
  it('should update details of logged in user', async function () {
    const user = {
      firstname: 'Jon',
      lastname: 'Doe',
      phone: '081234',
    };
    const response = await supertest(app)
      .put(`/v1/user/${userId}`)
      .set({
        'x-auth-token': userToken,
      })
      .send(user);
    expect(response.status).to.eql(200);
    expect(JSON.parse(response.text).data.userId.firstname).to.eql('Jon');
    expect(JSON.parse(response.text).data.userId.lastname).to.eql('Doe');
  });
});

describe('PATCH /v1/user/:id/password', function () {
  it('should update password of logged in user', async function () {
    const user = {
      oldPassword: 'notarealpassword10',
      password: 'notarealpassword11',
      confirmPassword: 'notarealpassword11',
    };
    const response = await supertest(app)
      .patch(`/v1/user/${userId}/password`)
      .set({
        'x-auth-token': userToken,
      })
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
  process.exit(0);
});
