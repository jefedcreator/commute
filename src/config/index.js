const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  BASE_URL: process.env.BASE_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  USER_JWT_SECRET: process.env.USER_JWT_SECRET,
  RIDER_JWT_SECRET: process.env.RIDER_JWT_SECRET,
  ADMIN_JWT_SECRET: process.env.ADMIN_JWT_SECRET,
  JWT_HEADER: {
    typ: 'JWT',
    alg: 'HS256',
  },
};
