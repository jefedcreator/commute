import { expect } from 'chai';
import { after, describe, it } from 'node:test';
import supertest from 'supertest';
import app from '../';

let userId;
let userToken;
let riderId;
let riderToken;
let rideId;

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

describe('POST /v1/ride', function () {
  it('should create a ride successfully', async function () {
    const ride = {
      campusName: 'university of lagos',
      paymentType: 'cash',
      userId,
      riderId,
    };
    const response = await supertest(app)
      .post('/v1/ride')
      .set({
        'x-auth-token': userToken,
      })
      .send(ride);
    rideId = JSON.parse(response.text).data._id;
    expect(response.status).to.eql(201);
  });
});

describe('GET /v1/ride/:id', function () {
  it('should get details of ride', async function () {
    const response = await supertest(app).get(`/v1/ride/${rideId}`).set({
      'x-auth-token': userToken,
    });
    expect(response.status).to.eql(200);
  });
});

describe('PUT /v1/ride/:id/cancel', function () {
  it('should cancel ride', async function () {
    const ride = {
      userId,
      riderId,
    };
    const response = await supertest(app)
      .put(`/v1/ride/${rideId}/cancel`)
      .set({
        'x-auth-token': riderToken,
      })
      .send(ride);
    expect(response.status).to.eql(200);
  });
});

describe('PUT /v1/ride/:id/approve', function () {
  it('should approve ride', async function () {
    const ride = {
      riderId,
    };
    const response = await supertest(app)
      .put(`/v1/ride/${rideId}/approve`)
      .set({
        'x-auth-token': riderToken,
      })
      .send(ride);
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
  process.exit(0);
});
