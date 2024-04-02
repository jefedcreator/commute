const Ride = require("../../models/ridesSchama");
const Wallet = require("../../models/walletSchema");
const mongoose = require("mongoose");

const completeRide = async (req, res) => {
  const { rideId } = req.body;

  if (!rideId) {
    return res.status(400).send({
      status: "ERROR",
      message: "Required inputs are missing",
      statusCode: 400,
    });
  }

  try {
    const completedRide = await Ride.findByIdAndUpdate(
      rideId,
      { rideStatus: "completed" },
      { new: true }
    );

    // const completedRide = await Ride.findById(rideId);

    if (!completedRide) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride not found",
        statusCode: 404,
      });
    }

    res.send({
      status: "SUCCESS",
      message: "Ride completed",
      completedRide,
      statusCode: 200,
    });
  } catch (err) {
    res.status(500).send({
      status: "ERROR",
      message: err.message,
      statusCode: 500,
    });
  }
};

module.exports = {
  completeRide,
};
