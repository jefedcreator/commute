# commute

A nodejs express server application for a ride hailing software for movement within universities

# Table of Contents

[Intoduction](#Introduction)

[Local development](#local-development)

[Docker](#docker)

[Testing](#testing)

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
