const Rider = require("../../models/riderSchema");
const Wallet = require("../../models/walletSchema");
const bcrypt = require("bcrypt");

const createRider = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      dob,
      phonenumber,
      carNumber,
      state,
      city,
      campus,
    } = req.body;

    if (!(fullName && dob && password && carNumber && phonenumber)) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing",
        statusCode: 400,
      });
    }

    const existingRider = await Rider.findOne({ fullName: fullName });
    if (existingRider) {
      return res.status(400).send({
        status: "ERROR",
        message: "Rider Already Exists",
        statusCode: 400,
      });
    }

    const riderDetails = {
      fullName,
      email,
      password,
      dob,
      phonenumber,
      carNumber,
      state,
      city,
      campus,
    };

    let newRider = new Rider({
      ...riderDetails,
    });

    const savedRider = await newRider.save();
    // done(null, savedRider);
    const walletDetails = {
      ownerId: savedRider._id,
      walletHolderName: savedRider.fullName,
      walletHolderEmail: savedRider.email,
      currentAmount: 0,
      crTicketAmount: 0,
      lastSpent: null,
      walletType: "rider",
    };

    let newWallet = new Wallet({
      ...walletDetails,
    });

    await newWallet.save();

    return res.status(400).send({
      status: "OK",
      message: "Rider Successfully created",
      statusCode: 201,
      rider_id: savedRider._id,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ status: "ERROR", message: error.message, statusCode: 500 });
  }
};

const deleteRider = (email, done) => {
  Rider.deleteOne({ email }, (err, deletedUser) => {
    if (err) {
      return done("Error deleting user:Error", err.message);
    }
    done(null, deletedUser);
  });
};

module.exports = {
  createRider,
  deleteRider,
};
