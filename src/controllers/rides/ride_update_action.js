const Ride = require("../../models/ridesSchama");
const Rider = require("../../models/riderSchema");
const User = require("../../models/userSchema");

const updatePaymentType = async (req, res) => {
  try {
    const { paymentType, rideId } = req.body;
    if (!paymentType || !["cr-ticket", "wallet"].includes(paymentType)) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing: cr-ticket or wallet",
        statusCode: 400,
      });
    }

    const updatedPaymentType = await Ride.findByIdAndUpdate(
      rideId,
      { paymentType },
      { new: true }
    );

    if (!updatedPaymentType) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride not found",
        statusCode: 404,
      });
    }

    res.status(200).send({
      status: "SUCCESS",
      message: "Ride Payment type updated",
      updatedPaymentType,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: "ERROR",
      message: err.message,
      statusCode: 500,
    });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, rideId } = req.body;
    if (!paymentStatus || !["completed", "cancelled"].includes(paymentStatus)) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing: completed or cancelled",
        statusCode: 400,
      });
    }
    const updatedPaymentStatus = await Ride.findByIdAndUpdate(
      rideId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedPaymentStatus) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride not found",
        statusCode: 404,
      });
    }

    res.status(200).send({
      status: "SUCCESS",
      message: "Ride Payment type updated",
      updatedPaymentStatus,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: "ERROR",
      message: err.message,
      statusCode: 500,
    });
  }
};

const updateRideStatus = async (req, res) => {
  ////implement joining a ride here....
  //////the first user to create the ride request will automatically join if rider arrives at pickup....
  /////ride is full until rider says it's full
  try {
    const { rideStatus, rideId, riderId } = req.body;
    if (
      !deliveryStatus ||
      !["in-transit", "waiting", "arrived"].includes(rideStatus)
    ) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing: in-transit, waiting or arrived",
        statusCode: 400,
      });
    }

    let updatedStatus;

    updatedStatus = await Ride.findByIdAndUpdate(
      rideId,
      { rideStatus },
      { new: true }
    );

    if (rideStatus == "arrived" && riderId != undefined) {
      updatedStatus = await Ride.findByIdAndUpdate(
        rideId,
        { rider: riderId },
        { new: true }
      );

      ///add firebase realtime after
    }

    if (!updatedStatus) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride not found",
        statusCode: 404,
      });
    }

    res.status(200).send({
      status: "SUCCESS",
      message: "Ride Status updated",
      updatedStatus,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).send({
      status: "ERROR",
      message: err.message,
      statusCode: 500,
    });
  }
};

const updateRiderCondition = async (req, res) => {
  try {
    const { riderCondition, rideId } = req.body;

    if (
      !riderCondition ||
      !["working", "busy", "free"].includes(riderCondition)
    ) {
      return res.status(400).send({
        status: "ERROR",
        message: "Required inputs are missing: working, busy or free",
        statusCode: 400,
      });
    }

    const updatedRiderCondition = await Ride.findByIdAndUpdate(
      rideId,
      { "rider.riderCondition": riderCondition },
      { new: true }
    );

    if (!updatedRiderCondition) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride not found",
        statusCode: 404,
      });
    }

    res.status(200).send({
      status: "SUCCESS",
      message: "Ride Status updated",
      updatedRiderCondition,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error updating riderStatus:", error);
    res.status(500).send({
      status: "ERROR",
      message: err.message,
      statusCode: 500,
    });
  }
};

//allow user join an exisiting ride nearby if the ride isn't full yet
const joinARide = async (req, res) => {
  const { rideId, userId, pickupName, pickupLat, pickupLng, dropped } =
    req.body;

  try {
    const existingRide = await Ride.findById(rideId);
    const user = await User.findById(userId);

    if (existingRide.isRideFull) {
      return res.status(404).send({
        status: "ERROR",
        message: "Ride is full",
        statusCode: 404,
      });
    }

    const joiningData = {
      userName: user.fullname,
      pickupName,
      pickupLat,
      pickupLng,
      dropped,
    };

    await existingRide.updateOne({ $push: { user: userId } }, { new: true });

    await existingRide.updateOne({ $push: { joining: joiningData } });

    ///add firebase realtime after
  } catch (error) {
    res.status(500).send({
      status: "ERROR",
      message: error.message,
      statusCode: 500,
    });
  }
};

module.exports = {
  updatePaymentType,
  updateRideStatus,
  updatePaymentStatus,
  updateRiderCondition,
  joinARide
};
