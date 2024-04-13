import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '../';

let riderId;
let riderToken;

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

describe('GET /v1/rider/:id', function () {
  it('should get details of logged in rider', async function () {
    const response = await supertest(app).get(`/v1/rider/${riderId}`).set({
      'x-auth-token': riderToken,
    });
    expect(response.status).to.eql(200);
  });
});

describe('PUT /v1/rider/:id', function () {
  it('should update details of logged in rider', async function () {
    const user = {
      firstname: 'Jon',
      lastname: 'Doe',
      phone: '081234',
    };
    const response = await supertest(app)
      .put(`/v1/user/${riderId}`)
      .set({
        'x-auth-token': riderToken,
      })
      .send(user);
    expect(response.status).to.eql(200);
    expect(JSON.parse(response.text).data.userId.firstname).to.eql('Jon');
    expect(JSON.parse(response.text).data.userId.lastname).to.eql('Doe');
  });
});

after(async function () {
  if (riderId) {
    const deleteResponse = await supertest(app).delete(`/v1/user/${riderId}`);
    expect(deleteResponse.status).to.eql(200);
  }
  process.exit(0);
});
