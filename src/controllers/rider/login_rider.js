const Rider = require("../../models/riderSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { RIDER_JWT_SECRET } = require("../../config");

function verifyRider({ riderFullName, password }, rider) {
  return (
    rider &&
    riderFullName === rider.riderFullName &&
    bcrypt.compareSync(password, rider.password)
  );
}

function createJWT(user) {
  const payload = {
    role: "USER",
    email: user.email,
    password: user.password,
  };

  const token = jsonwebtoken.sign(payload, RIDER_JWT_SECRET, {
    expiresIn: 3600,
  });

  return token;
}

async function loginRider(req, res) {
  try {
    const { riderFullName, password } = req.body;
    if (!(riderFullName && password)) {
      return res.status(400).send({
        status: "ERROR",
        message: "riderFullName or password cannot be Empty",
        statusCode: 400,
      });
    }
    const result = await Rider.findOne({ riderFullName });
    if (!verifyRider(req.body, result)) {
      throw new Error("Invalid credentials");
    }
    const token = createJWT(result);
    res
      .status(200)
      .send({ status: "OK", token, riderId: result._id, statusCode: 200 });
  } catch (err) {
    res
      .status(500)
      .send({ status: "ERROR", message: err.message, statusCode: 500 });
  }
}

module.exports = loginRider;
