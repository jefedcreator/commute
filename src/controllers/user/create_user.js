const User = require("../../models/userSchema");
const Wallet = require("../../models/walletSchema");
const { campusList } = require("../../utils/campus_file");

const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { fullname, email, campusName, dob, phonenumber, gender, password } =
    req.body;

  try {
    //retrive name, email and password from request body
    if (!(fullname && email && password) || !campusList.includes(campusName)) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing or Invalid",
        statusCode: 400,
      });
    }

    const existingUser = await User.findOne({
      $or: [{ phonenumber: phonenumber }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).send({
        status: "ERROR",
        message: "User Already Exists",
        statusCode: 400,
      });
    }

    const userDetails = {
      fullname,
      email,
      password,
      phonenumber,
      dob,
      gender,
      campusName,
    };

    let newUser = new User({
      ...userDetails,
      campusAddressInfo: {
        name: campusName,
      },
    });

    const savedUser = await newUser.save();

    const walletDetails = {
      ownerId: savedUser._id,
      walletHolderName: savedUser.fullname,
      walletHolderEmail: savedUser.email,
      currentAmount: 0,
      crTicketAmount: 0,
      lastSpent: null,
      walletType: "user",
    };

    let newWallet = new Wallet({
      ...walletDetails,
    });
    
    await newWallet.save();

    await User.findOneAndUpdate(
      { _id: savedUser._id },
      {
        "walletInfo.currentAmount": 0,
        "walletInfo.currency": newWallet.currency,
        "walletInfo.walletId": newWallet._id,
      }
    );

    return res.status(400).send({
      status: "OK",
      message: "User Successfully created",
      statusCode: 201,
      user_id: savedUser._id,
    });
  } catch (error) {
    res.status(400).send({
      status: "ERROR",
      message: error.message,
      statusCode: 400,
    });
  }
};

const deleteUser = (email, done) => {
  User.deleteOne({ email }, (err, deletedUser) => {
    if (err) {
      return done("Error deleting user:Error", err.message);
    }
    done(null, deletedUser);
  });
};

module.exports = { createUser, deleteUser };
