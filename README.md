# commute

A nodejs express server application for a ride hailing software for movement within universities

# Table of Contents

[Intoduction](#Introduction)

[Local development](#local-development)

[Docker](#docker)

[Testing](#testing)

[API](#api-walkthrough)

## Introduction

As a student in a university, mobility is a necessity. From my experience, however, students have to queue under really long lines at certain stops, under the blistering sun of the day. This is the major inspiration for Commute, a Node.js Express server built with TypeScript and Joi for validations. This application caters to three categories of users: admin, users, and riders. Riders and users can sign up and sign in on the app. Users can create a ride for a fee if riders approve. Riders can approve, complete, and cancel a ride.

## Local development

```bash
git clone https://github.com/jefedcreator/commute.git
cd commute/
```

#### Nodejs v20.11.1

Follow instructions to install the latest version of nodejs for your platform in the [nodejs docs](https://nodejs.org/en/download)

#### Dependencies

Once you have nodejs setup and running, install dependencies by navigating to the `/commute` directory and running:

```bash
yarn install
```

##### Key Dependencies

- [Express](https://expressjs.com/) Express is a
  Fast, unopinionated, minimalist web framework for Node.js

- [Typescript](https://www.typescriptlang.org/) TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

- [Mongoose](https://mongoosejs.com/) elegant mongodb object modeling for node.js

- [Joi](https://joi.dev/) The most powerful schema description language and data validator for JavaScript.

### **Initialize development env using:**

```bash
touch .env
echo -e "MONGODB_URI=\"\"\nMONGODB_NAME=\"\"\nUSER_JWT=\"\"\nADMIN_JWT=\"\"" >> .env
```

### **Run the development server:**

```bash
yarn dev
```

### **Verify on the Browser**<br>

Navigate to project homepage [http://0.0.0.0:3000/](http://0.0.0.0:3000/) or [http://localhost:3000](http://localhost:3000)

### Docker

This application is hosted as docker image. Docker is an open platform for developing, shipping, testing and running applications. [Docker](https://docs.docker.com/get-docker/)

#### Pull image

```bash
docker pull jefedcreator/commute:v1
```

#### Run container

```bash
docker compose up
```

#### Test container

```bash
docker compose run --rm app yarn test
```

## Testing

```bash
yarn test
```

## API walkthrough

# Project: commute

REST API for ride hailing SAAS within university campuses

# 📁 Collection: admin

## End-point: rides

Fetch rides

### Method: GET

> ```
> {{local}}/v1/admin/rides?paymentType=cash
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{adminToken}} |

### Query Params

| Param       | value |
| ----------- | ----- |
| paymentType | cash  |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "fetch rides",
  "data": {
    "rides": [
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "6641653dbc176bd5af0c657d",
        "campusName": "university of lagos",
        "paymentStatus": "completed",
        "paymentType": "cash",
        "status": "success",
        "distance": 0,
        "cost": 10000,
        "duration": 2,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-13T00:56:29.084Z",
        "updatedAt": "2024-05-13T00:58:55.879Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "664161f6032db13c752b1f8c",
        "campusName": "university of lagos",
        "paymentStatus": "completed",
        "paymentType": "cash",
        "status": "success",
        "distance": 0,
        "cost": 60000,
        "duration": 12,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-13T00:42:30.599Z",
        "updatedAt": "2024-05-13T00:54:51.337Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "66415fa2c4eeb2c30abc039c",
        "campusName": "university of lagos",
        "paymentStatus": "completed",
        "paymentType": "cash",
        "status": "success",
        "distance": 0,
        "cost": 20000,
        "duration": 400,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-13T00:32:34.129Z",
        "updatedAt": "2024-05-13T00:37:07.709Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "663fd847bdbdf7ed1ba210c9",
        "campusName": "university of lagos",
        "paymentStatus": "completed",
        "paymentType": "cash",
        "status": "success",
        "distance": 0,
        "cost": 8325000,
        "duration": 0,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-11T20:42:47.020Z",
        "updatedAt": "2024-05-13T00:29:36.019Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "663f4ca77f1090619a44dafe",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "cancelled",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-11T10:47:03.695Z",
        "updatedAt": "2024-05-11T20:39:24.896Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "663f4afe7f1090619a44daf9",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "pending",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "663f297e2b717e890cf59bdb",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-11T10:39:58.335Z",
        "updatedAt": "2024-05-11T10:39:58.335Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "663f48757f1090619a44daf2",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "pending",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "663f3b607f1090619a44dada",
        "riderId": "663f3b607f1090619a44dada",
        "createdAt": "2024-05-11T10:29:09.127Z",
        "updatedAt": "2024-05-11T10:29:09.127Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "6626d0f209056ec89017eae9",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "completed",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "6626d0f009056ec89017ead6",
        "riderId": "6626d0f109056ec89017eade",
        "createdAt": "2024-04-22T21:04:50.218Z",
        "updatedAt": "2024-04-22T21:04:51.602Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "66237aef62a2d42ea465a016",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "completed",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "66237aed62a2d42ea465a003",
        "riderId": "66237aee62a2d42ea465a00b",
        "createdAt": "2024-04-20T08:21:03.450Z",
        "updatedAt": "2024-04-20T08:21:05.178Z",
        "__v": 0
      },
      {
        "pickupPoint": {
          "pickupName": "",
          "pickupLat": "",
          "pickupLng": ""
        },
        "destinationPoint": {
          "destinationName": "",
          "destinationLat": "",
          "destinationLng": ""
        },
        "_id": "6622f4decfda5ed24d1ce67c",
        "campusName": "university of lagos",
        "paymentStatus": "pending",
        "paymentType": "cash",
        "status": "completed",
        "distance": 0,
        "cost": 0,
        "duration": 0,
        "userId": "6622f4dccfda5ed24d1ce669",
        "riderId": "6622f4dccfda5ed24d1ce671",
        "createdAt": "2024-04-19T22:49:02.808Z",
        "updatedAt": "2024-04-19T22:49:05.770Z",
        "__v": 0
      }
    ],
    "totalDocuments": 11,
    "pageable": {
      "page": 1,
      "size": 10
    }
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: users

Fetch users

### Method: GET

> ```
> {{local}}/v1/admin/users?role=users
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{adminToken}} |

### Query Params

| Param | value |
| ----- | ----- |
| role  | users |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "fetch users",
  "data": {
    "users": [],
    "totalDocuments": 0,
    "pageable": {
      "page": 1,
      "size": 10
    }
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: suspend user

Suspend and unsuspend user

### Method: PATCH

> ```
> {{local}}/v1/admin/users/:id
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{adminToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "user suspended",
  "data": {
    "_id": "663f3b607f1090619a44dadc",
    "email": "jondoe12@email.com",
    "password": "$2b$10$eL0GunqOv982r80bCya50uyICKb47Dpj5KNI5SvQHjcg60F9GgA7a",
    "role": "rider",
    "userId": "663f3b607f1090619a44dada",
    "isActive": false,
    "createdAt": "2024-05-11T09:33:20.199Z",
    "updatedAt": "2024-05-13T16:06:49.440Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete admin

Delete admin account

### Method: DELETE

> ```
> {{local}}/v1/admin/
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete user

Delete user account

### Method: DELETE

> ```
> {{local}}/v1/admin/users/:id
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: sign in

signin admin

### Method: POST

> ```
> {{local}}/v1/admin/signin
> ```

### Body (**raw**)

```json
{
  "email": "jondoe20@email.com",
  "password": "notarealpassword10"
}
```

### Response: 201

```json
{
  "statusCode": 201,
  "message": "logged in",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDIyYjhmMDJhMTRkYjc0NjQ4MDk3NCIsImlhdCI6MTcxNTYxMjgxNywiZXhwIjoxNzE2MDQ0ODE3fQ.kNQnGaZSmIPAXumdmhR_Yo3jDiah83VOY4REdx8mjJo",
    "_id": "66422b8f02a14db746480974",
    "email": "jondoe20@email.com",
    "firstname": "Alfa 5",
    "lastname": "Smart bot"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: auth

## End-point: sign up

signup user

### Method: POST

> ```
> {{local}}/v1/auth/signup
> ```

### Body (**raw**)

```json
{
  "email": "jondoe11@email.com",
  "firstname": "Alfa 5",
  "lastname": "Smart bot",
  "password": "notarealpassword10",
  "phone": "081234",
  "gender": "male",
  "role": "user"
}
```

### Response: 409

```json
{
  "status": "ERROR",
  "statusCode": 409,
  "message": "email already exists"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: signin

signin user

### Method: POST

> ```
> {{local}}/v1/auth/signin
> ```

### Body (**raw**)

```json
{
  "password": "notarealpassword10",
  "email": "jondoe11@email.com"
}
```

### Response: 201

```json
{
  "statusCode": 201,
  "message": "logged in",
  "data": {
    "_id": "663f3b607f1090619a44dada",
    "email": "jondoe12@email.com",
    "firstname": "Alfa 5",
    "lastname": "Smart bot",
    "role": "rider",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2YzYjYwN2YxMDkwNjE5YTQ0ZGFkYSIsInJvbGUiOiJyaWRlciIsImlhdCI6MTcxNTQyMDM0NCwiZXhwIjoxNzE2MDI1MTQ0fQ.EFw6sxX3957foz-5b7wczoycZU-kCaQ_KpLwnTA36r0"
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: reset password

reset user password

### Method: POST

> ```
> undefined
> ```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: ride

## End-point: create ride

create a ride request

### Method: POST

> ```
> {{local}}/v1/rides
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Body (**raw**)

```json
{
  "campusName": "university of lagos",
  "paymentType": "cash",
  "userId": "{{userId}}",
  "riderId": "{{riderId}}"
}
```

### Response: 201

```json
{
  "statusCode": 201,
  "message": "ride created",
  "data": {
    "campusName": "university of lagos",
    "paymentStatus": "pending",
    "paymentType": "cash",
    "status": "pending",
    "distance": 0,
    "cost": 0,
    "duration": 0,
    "userId": "663f3b607f1090619a44dada",
    "riderId": "663f3b607f1090619a44dada",
    "pickupPoint": {
      "pickupName": "",
      "pickupLat": "",
      "pickupLng": ""
    },
    "destinationPoint": {
      "destinationName": "",
      "destinationLat": "",
      "destinationLng": ""
    },
    "_id": "663f48757f1090619a44daf2",
    "createdAt": "2024-05-11T10:29:09.127Z",
    "updatedAt": "2024-05-11T10:29:09.127Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get ride

get individual ride

### Method: GET

> ```
> {{local}}/v1/rides/:id
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "ride fetched",
  "data": {
    "pickupPoint": {
      "pickupName": "",
      "pickupLat": "",
      "pickupLng": ""
    },
    "destinationPoint": {
      "destinationName": "",
      "destinationLat": "",
      "destinationLng": ""
    },
    "_id": "663f4ca77f1090619a44dafe",
    "campusName": "university of lagos",
    "paymentStatus": "pending",
    "paymentType": "cash",
    "status": "pending",
    "distance": 0,
    "cost": 0,
    "duration": 0,
    "userId": {
      "_id": "663f297e2b717e890cf59bdb",
      "email": "jondoe11@email.com",
      "firstname": "Alfa 5",
      "lastname": "Smart bot"
    },
    "riderId": {
      "_id": "663f3b607f1090619a44dada",
      "email": "jondoe12@email.com",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "__t": "rider"
    },
    "createdAt": "2024-05-11T10:47:03.695Z",
    "updatedAt": "2024-05-11T10:47:03.695Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: cancel

cancel requested ride

### Method: PATCH

> ```
> {{local}}/v1/rides/:id/cancel
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "ride canceled",
  "data": true
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: approve

approve requested ride

### Method: PATCH

> ```
> {{local}}/v1/rides/:id/approve
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Body (**raw**)

```json
{
  "userId": "{{userId}}"
}
```

### Response: 200

```json
{
  "statusCode": 200,
  "message": "ride accepted",
  "data": true
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: complete

complete requested ride

### Method: PATCH

> ```
> {{local}}/v1/rides/:id/complete
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "ride completed",
  "data": true
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: rider

## End-point: get rider

get rider detail

### Method: GET

> ```
> {{local}}/v1/rider
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "booking fetched",
  "data": {
    "vehicle": {
      "vehicleName": "Toyota",
      "vehicleId": "12345"
    },
    "walletInfo": {
      "currentAmount": 0
    },
    "_id": "663f3b607f1090619a44dada",
    "rating": 0,
    "email": "jondoe12@email.com",
    "firstname": "Alfa 5",
    "lastname": "Smart bot",
    "gender": "male",
    "phone": "081234",
    "avatar": "",
    "role": "rider",
    "totalPayments": 0,
    "totalRides": 4,
    "__t": "rider",
    "createdAt": "2024-05-11T09:33:20.048Z",
    "updatedAt": "2024-05-13T00:37:07.831Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update rider

update rider

### Method: PATCH

> ```
> {{local}}/v1/rider
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Body (**raw**)

```json
{
  "firstname": "Jon",
  "lastname": "Doe",
  "phone": "081234"
}
```

### Response: 200

```json
{
  "statusCode": 200,
  "message": "rider updated",
  "data": {
    "vehicle": {
      "vehicleName": "Toyota",
      "vehicleId": "12345"
    },
    "walletInfo": {
      "currentAmount": 0
    },
    "_id": "663f3b607f1090619a44dada",
    "rating": 0,
    "email": "jondoe12@email.com",
    "firstname": "Jon",
    "lastname": "Doe",
    "gender": "male",
    "phone": "081234",
    "avatar": "",
    "role": "rider",
    "totalPayments": 0,
    "totalRides": 4,
    "__t": "rider",
    "createdAt": "2024-05-11T09:33:20.048Z",
    "updatedAt": "2024-05-13T00:45:49.124Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get transactions

get rider transactions

### Method: GET

> ```
> {{local}}/v1/rider/transactions?status=success&size=5
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Query Params

| Param  | value   |
| ------ | ------- |
| status | success |
| size   | 5       |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "user fetched",
  "data": [
    {
      "_id": "6641668829f982741abc01a4",
      "type": "payment",
      "amount": 50,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641668729f982741abc01a3",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790174453,
      "rideId": "6641661729f982741abc0198",
      "createdAt": "2024-05-13T01:02:00.195Z",
      "updatedAt": "2024-05-13T01:02:16.236Z",
      "__v": 0
    },
    {
      "_id": "664165bcbc176bd5af0c6589",
      "type": "payment",
      "amount": 100,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664165bbbc176bd5af0c6588",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790171666,
      "rideId": "6641653dbc176bd5af0c657d",
      "createdAt": "2024-05-13T00:58:36.506Z",
      "updatedAt": "2024-05-13T00:58:55.879Z",
      "__v": 0
    },
    {
      "_id": "664164c9975fec7cabbecc3c",
      "type": "payment",
      "amount": 600,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664164c8975fec7cabbecc3b",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790169059,
      "rideId": "664161f6032db13c752b1f8c",
      "createdAt": "2024-05-13T00:54:33.413Z",
      "updatedAt": "2024-05-13T00:54:51.337Z",
      "__v": 0
    },
    {
      "_id": "6641609fc4eeb2c30abc03b1",
      "type": "payment",
      "amount": 200,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641609ec4eeb2c30abc03b0",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790155438,
      "rideId": "66415fa2c4eeb2c30abc039c",
      "createdAt": "2024-05-13T00:36:47.287Z",
      "updatedAt": "2024-05-13T00:37:07.594Z",
      "__v": 0
    },
    {
      "_id": "66415eb2eace3164f453721e",
      "type": "payment",
      "amount": 83250,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "66415eb1eace3164f453721d",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790147705,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:28:34.014Z",
      "updatedAt": "2024-05-13T00:29:35.851Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get rides

get rider rides

### Method: GET

> ```
> {{local}}/v1/rider/rides?status=success&size=5
> ```

### Headers

| Content-Type | Value          |
| ------------ | -------------- |
| x-auth-token | {{riderToken}} |

### Query Params

| Param  | value   |
| ------ | ------- |
| status | success |
| size   | 5       |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "rides fetched",
  "data": [
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "6641661729f982741abc0198",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "card",
      "status": "success",
      "distance": 0,
      "cost": 5000,
      "duration": 1,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T01:00:07.666Z",
      "updatedAt": "2024-05-13T01:02:16.236Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "6641653dbc176bd5af0c657d",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 10000,
      "duration": 2,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:56:29.084Z",
      "updatedAt": "2024-05-13T00:58:55.879Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "664161f6032db13c752b1f8c",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 60000,
      "duration": 12,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:42:30.599Z",
      "updatedAt": "2024-05-13T00:54:51.337Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "66415fa2c4eeb2c30abc039c",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 20000,
      "duration": 400,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:32:34.129Z",
      "updatedAt": "2024-05-13T00:37:07.709Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "663fd847bdbdf7ed1ba210c9",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 8325000,
      "duration": 0,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-11T20:42:47.020Z",
      "updatedAt": "2024-05-13T00:29:36.019Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: user

## End-point: get user

get user

### Method: GET

> ```
> {{local}}/v1/user
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "user fetched",
  "data": {
    "_id": "663f297e2b717e890cf59bdd",
    "email": "jondoe11@email.com",
    "password": "$2b$10$.EyBXMmiKeA9vcDoEgXkRefMpoKCfeRaxz1Q52GdS1UghOoSljaRO",
    "role": "user",
    "userId": {
      "_id": "663f297e2b717e890cf59bdb",
      "firstname": "Alfa 5",
      "lastname": "Smart bot"
    },
    "isActive": true,
    "createdAt": "2024-05-11T08:17:02.314Z",
    "updatedAt": "2024-05-11T08:17:02.314Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: update user

update user

### Method: PATCH

> ```
> {{local}}/v1/user
> ```

### Body (**raw**)

```json
{
  "firstname": "Jon",
  "lastname": "Doe",
  "phone": "081234"
}
```

### Response: 200

```json
{
  "statusCode": 200,
  "message": "user updated",
  "data": {
    "_id": "663f297e2b717e890cf59bdd",
    "email": "jondoe11@email.com",
    "password": "$2b$10$.EyBXMmiKeA9vcDoEgXkRefMpoKCfeRaxz1Q52GdS1UghOoSljaRO",
    "role": "user",
    "userId": {
      "_id": "663f297e2b717e890cf59bdb",
      "firstname": "Jon",
      "lastname": "Doe"
    },
    "isActive": true,
    "createdAt": "2024-05-11T08:17:02.314Z",
    "updatedAt": "2024-05-11T08:17:02.314Z",
    "__v": 0
  }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: delete user

delete user

### Method: DELETE

> ```
> {{local}}/v1/user
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get transactions

get user transactions

### Method: GET

> ```
> {{local}}/v1/user/transactions?status=success&size=5
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Query Params

| Param  | value   |
| ------ | ------- |
| status | success |
| size   | 5       |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "user fetched",
  "data": [
    {
      "_id": "6641668829f982741abc01a4",
      "type": "payment",
      "amount": 50,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641668729f982741abc01a3",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790174453,
      "rideId": "6641661729f982741abc0198",
      "createdAt": "2024-05-13T01:02:00.195Z",
      "updatedAt": "2024-05-13T01:02:16.236Z",
      "__v": 0
    },
    {
      "_id": "664165bcbc176bd5af0c6589",
      "type": "payment",
      "amount": 100,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664165bbbc176bd5af0c6588",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790171666,
      "rideId": "6641653dbc176bd5af0c657d",
      "createdAt": "2024-05-13T00:58:36.506Z",
      "updatedAt": "2024-05-13T00:58:55.879Z",
      "__v": 0
    },
    {
      "_id": "664164c9975fec7cabbecc3c",
      "type": "payment",
      "amount": 600,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664164c8975fec7cabbecc3b",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790169059,
      "rideId": "664161f6032db13c752b1f8c",
      "createdAt": "2024-05-13T00:54:33.413Z",
      "updatedAt": "2024-05-13T00:54:51.337Z",
      "__v": 0
    },
    {
      "_id": "6641609fc4eeb2c30abc03b1",
      "type": "payment",
      "amount": 200,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641609ec4eeb2c30abc03b0",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790155438,
      "rideId": "66415fa2c4eeb2c30abc039c",
      "createdAt": "2024-05-13T00:36:47.287Z",
      "updatedAt": "2024-05-13T00:37:07.594Z",
      "__v": 0
    },
    {
      "_id": "66415eb2eace3164f453721e",
      "type": "payment",
      "amount": 83250,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "66415eb1eace3164f453721d",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790147705,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:28:34.014Z",
      "updatedAt": "2024-05-13T00:29:35.851Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get rides

fetch user rides

### Method: GET

> ```
> {{local}}/v1/user/rides?status=success&size=5&paymentType=cash
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Query Params

| Param       | value   |
| ----------- | ------- |
| status      | success |
| size        | 5       |
| paymentType | cash    |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "rides fetched",
  "data": [
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "6641653dbc176bd5af0c657d",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 10000,
      "duration": 2,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:56:29.084Z",
      "updatedAt": "2024-05-13T00:58:55.879Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "664161f6032db13c752b1f8c",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 60000,
      "duration": 12,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:42:30.599Z",
      "updatedAt": "2024-05-13T00:54:51.337Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "66415fa2c4eeb2c30abc039c",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 20000,
      "duration": 400,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-13T00:32:34.129Z",
      "updatedAt": "2024-05-13T00:37:07.709Z",
      "__v": 0
    },
    {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "663fd847bdbdf7ed1ba210c9",
      "campusName": "university of lagos",
      "paymentStatus": "completed",
      "paymentType": "cash",
      "status": "success",
      "distance": 0,
      "cost": 8325000,
      "duration": 0,
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "createdAt": "2024-05-11T20:42:47.020Z",
      "updatedAt": "2024-05-13T00:29:36.019Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# 📁 Collection: transactions

## End-point: get transactions

Fetch all transactions

### Method: GET

> ```
> {{local}}/v1/transactions
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "transactions fetched",
  "data": [
    {
      "_id": "6641668829f982741abc01a4",
      "type": "payment",
      "amount": 50,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641668729f982741abc01a3",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790174453,
      "rideId": "6641661729f982741abc0198",
      "createdAt": "2024-05-13T01:02:00.195Z",
      "updatedAt": "2024-05-13T01:02:16.236Z",
      "__v": 0
    },
    {
      "_id": "664165bcbc176bd5af0c6589",
      "type": "payment",
      "amount": 100,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664165bbbc176bd5af0c6588",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790171666,
      "rideId": "6641653dbc176bd5af0c657d",
      "createdAt": "2024-05-13T00:58:36.506Z",
      "updatedAt": "2024-05-13T00:58:55.879Z",
      "__v": 0
    },
    {
      "_id": "664164c9975fec7cabbecc3c",
      "type": "payment",
      "amount": 600,
      "status": "success",
      "firstname": "Jon",
      "lastname": "Doe",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664164c8975fec7cabbecc3b",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790169059,
      "rideId": "664161f6032db13c752b1f8c",
      "createdAt": "2024-05-13T00:54:33.413Z",
      "updatedAt": "2024-05-13T00:54:51.337Z",
      "__v": 0
    },
    {
      "_id": "6641609fc4eeb2c30abc03b1",
      "type": "payment",
      "amount": 200,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641609ec4eeb2c30abc03b0",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790155438,
      "rideId": "66415fa2c4eeb2c30abc039c",
      "createdAt": "2024-05-13T00:36:47.287Z",
      "updatedAt": "2024-05-13T00:37:07.594Z",
      "__v": 0
    },
    {
      "_id": "66415eb2eace3164f453721e",
      "type": "payment",
      "amount": 83250,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "66415eb1eace3164f453721d",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790147705,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:28:34.014Z",
      "updatedAt": "2024-05-13T00:29:35.851Z",
      "__v": 0
    },
    {
      "_id": "664159c02c36d5581d068866",
      "type": "payment",
      "amount": 82200,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664159bf2c36d5581d068865",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790131720,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:07:28.281Z",
      "updatedAt": "2024-05-13T00:09:32.519Z",
      "__v": 0
    },
    {
      "_id": "6641580245903e404e1f3449",
      "type": "payment",
      "amount": 81850,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641580045903e404e1f3448",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790123222,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:00:02.338Z",
      "updatedAt": "2024-05-13T00:03:53.446Z",
      "__v": 0
    },
    {
      "_id": "664156fca7cbb5d5a4c0f3c2",
      "type": "payment",
      "amount": 81600,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:55:40.454Z",
      "updatedAt": "2024-05-12T23:55:40.454Z",
      "__v": 0
    },
    {
      "_id": "6641565c5a91aa8027e39d7e",
      "type": "payment",
      "amount": 81500,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:53:00.273Z",
      "updatedAt": "2024-05-12T23:53:00.273Z",
      "__v": 0
    },
    {
      "_id": "664155fe768a40280bef022d",
      "type": "payment",
      "amount": 81400,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:51:26.221Z",
      "updatedAt": "2024-05-12T23:51:26.221Z",
      "__v": 0
    },
    {
      "_id": "664155b52371694ab1dab707",
      "type": "payment",
      "amount": 81350,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:50:13.979Z",
      "updatedAt": "2024-05-12T23:50:13.979Z",
      "__v": 0
    },
    {
      "_id": "6641529c67f49c240ea59695",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:37:00.579Z",
      "updatedAt": "2024-05-12T23:37:00.579Z",
      "__v": 0
    },
    {
      "_id": "66415243dd1bc79cf65038dd",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:35:31.894Z",
      "updatedAt": "2024-05-12T23:35:31.894Z",
      "__v": 0
    },
    {
      "_id": "664151cfd67f75a579994e77",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:33:35.224Z",
      "updatedAt": "2024-05-12T23:33:35.224Z",
      "__v": 0
    },
    {
      "_id": "66414e7fcd1c4d5f53f7086c",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:19:27.227Z",
      "updatedAt": "2024-05-12T23:19:27.227Z",
      "__v": 0
    },
    {
      "_id": "66414e29831427da86c07ede",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:18:01.193Z",
      "updatedAt": "2024-05-12T23:18:01.193Z",
      "__v": 0
    },
    {
      "_id": "66414ddd88b6892941c64a4f",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:16:45.059Z",
      "updatedAt": "2024-05-12T23:16:45.059Z",
      "__v": 0
    },
    {
      "_id": "66414d9bd84d5d93ee5d87c0",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:15:39.387Z",
      "updatedAt": "2024-05-12T23:15:39.387Z",
      "__v": 0
    },
    {
      "_id": "66414d65e82d42860f925306",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:14:45.545Z",
      "updatedAt": "2024-05-12T23:14:45.545Z",
      "__v": 0
    },
    {
      "_id": "66414c81334c9eb016ff65c1",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:10:57.846Z",
      "updatedAt": "2024-05-12T23:10:57.846Z",
      "__v": 0
    },
    {
      "_id": "66414b22ccd6c0f01300d33d",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:05:06.579Z",
      "updatedAt": "2024-05-12T23:05:06.579Z",
      "__v": 0
    },
    {
      "_id": "66414aac1a9bbe506c607b85",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:03:08.014Z",
      "updatedAt": "2024-05-12T23:03:08.014Z",
      "__v": 0
    },
    {
      "_id": "66414a7421416f9f73684c8a",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T23:02:12.684Z",
      "updatedAt": "2024-05-12T23:02:12.684Z",
      "__v": 0
    },
    {
      "_id": "6641489dad786ae9ca63ac8c",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T22:54:21.685Z",
      "updatedAt": "2024-05-12T22:54:21.685Z",
      "__v": 0
    },
    {
      "_id": "6640872e819490ca70512a69",
      "type": "payment",
      "amount": 100,
      "status": "pending",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "",
      "paymentProvider": "PAYSTACK",
      "paymentId": 0,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T09:09:02.541Z",
      "updatedAt": "2024-05-12T09:09:02.541Z",
      "__v": 0
    },
    {
      "_id": "664086d5b4cb4e847cec3e3e",
      "type": "payment",
      "amount": 100,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3788329586,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T09:07:33.752Z",
      "updatedAt": "2024-05-12T09:09:21.438Z",
      "__v": 0
    }
  ]
}
```

### Response: 200

```json
{
  "statusCode": 200,
  "message": "transactions fetched",
  "data": [
    {
      "_id": "664159c02c36d5581d068866",
      "type": "payment",
      "amount": 82200,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "664159bf2c36d5581d068865",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790131720,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:07:28.281Z",
      "updatedAt": "2024-05-13T00:09:32.519Z",
      "__v": 0
    },
    {
      "_id": "6641580245903e404e1f3449",
      "type": "payment",
      "amount": 81850,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "6641580045903e404e1f3448",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3790123222,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-13T00:00:02.338Z",
      "updatedAt": "2024-05-13T00:03:53.446Z",
      "__v": 0
    },
    {
      "_id": "664086d5b4cb4e847cec3e3e",
      "type": "payment",
      "amount": 100,
      "status": "success",
      "firstname": "Alfa 5",
      "lastname": "Smart bot",
      "email": "jondoe11@email.com",
      "userId": "663f297e2b717e890cf59bdb",
      "riderId": "663f3b607f1090619a44dada",
      "reference": "663fd847bdbdf7ed1ba210c9",
      "paymentChannel": "CARD",
      "paymentProvider": "PAYSTACK",
      "paymentId": 3788329586,
      "rideId": "663fd847bdbdf7ed1ba210c9",
      "createdAt": "2024-05-12T09:07:33.752Z",
      "updatedAt": "2024-05-12T09:09:21.438Z",
      "__v": 0
    }
  ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get transaction

Fetch transaction detail

### Method: GET

> ```
> {{local}}/v1/transactions/:id
> ```

### Headers

| Content-Type | Value         |
| ------------ | ------------- |
| x-auth-token | {{userToken}} |

### Response: 200

```json
{
  "statusCode": 200,
  "message": "transaction fetched",
  "data": {
    "_id": "6641580245903e404e1f3449",
    "type": "payment",
    "amount": 81850,
    "status": "success",
    "firstname": "Alfa 5",
    "lastname": "Smart bot",
    "email": "jondoe11@email.com",
    "userId": "663f297e2b717e890cf59bdb",
    "riderId": "663f3b607f1090619a44dada",
    "reference": "6641580045903e404e1f3448",
    "paymentChannel": "CARD",
    "paymentProvider": "PAYSTACK",
    "paymentId": 3790123222,
    "rideId": {
      "pickupPoint": {
        "pickupName": "",
        "pickupLat": "",
        "pickupLng": ""
      },
      "destinationPoint": {
        "destinationName": "",
        "destinationLat": "",
        "destinationLng": ""
      },
      "_id": "663fd847bdbdf7ed1ba210c9"
    },
    "createdAt": "2024-05-13T00:00:02.338Z",
    "updatedAt": "2024-05-13T00:03:53.446Z",
    "__v": 0
  }
}
```
