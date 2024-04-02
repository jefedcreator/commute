const User = require("../../models/userSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { USER_JWT_SECRET } = require("../../config");

function verifyUser({ email, password }, user) {
  return (
    user && email === user.email && bcrypt.compareSync(password, user.password)
  );
}

function createJWT(user) {
  const payload = {
    role: "USER",
    email: user.email,
    id: user._id,
  };

  const token = jsonwebtoken.sign(payload, USER_JWT_SECRET, {
    expiresIn: "5 days",
  });

  return token;
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        status: "ERROR",
        message: "email or password cannot be Empty",
        statusCode: 400,
      });
    }

    const result = await User.findOne({ email });
    if (!verifyUser(req.body, result)) {
      throw new Error("Invalid credentials");
    }

    const token = createJWT(result);
    res.status(200).send({
      status: "OK",
      token,
      user_id: result._id,
      statusCode: 200,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "ERROR", message: err.message, statusCode: 500 });
  }
}

module.exports = loginUser;
