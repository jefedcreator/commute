const RideSchema = require("../../models/ridesSchama");
const User = require("../../models/userSchema");
const { writeToDb } = require("../../utils/firestore.service");
const ride_pricing = require("./ride_pricing");

const createRide = async (req, res) => {
  const {
    campusName,
    pickupAddress,
    pickupLat,
    pickupLng,
    destinationAddress,
    destinationLat,
    destinationLng,
    deliveryCost,
    paymentStatus,
    paymentType,
    distance,
    time,
    paymentReferenceId,
    userId,
  } = req.body;

  const user = await User.findOne({ _id: userId });

  try {
  
    if (!user) {
      return res.status(404).send({
        status: "ERROR",
        message: "user not found",
      });
    }

    const setReqDetails = {
      campusName,
      userId,
      paymentStatus,
      paymentType,
      distance,
      time,
      paymentReferenceId,
    };

    // ride_pricing({
    //     distance: 120,
    //     time: 40
    // }).then(
    //     console.log(any)
    // );

    let newRide = new RideSchema({
      ...setReqDetails,
      pickupPoint: {
        pickupName: pickupAddress,
        pickupLat: pickupLat,
        pickupLng: pickupLng,
      },
      destinationPoint: {
        destinationName: destinationAddress,
        destinationLat: destinationLat,
        destinationLng: destinationLng,
      },
      costDetails: {
        deliveryCost: deliveryCost,
      },
    });

    // await writeToDb("rides", {
    //   details: setReqDetails,
    //   riderId: newRide._id.toString(),
    //   pickupPoint: {
    //     pickupName: pickupAddress,
    //     pickupLat: pickupLat,
    //     pickupLng: pickupLng,
    //   },
    //   destinationPoint: {
    //     destinationName: destinationAddress,
    //     destinationLat: destinationLat,
    //     destinationLng: destinationLng,
    //   },
    //   costDetails: {
    //     deliveryCost: deliveryCost,
    //   },
    // });

    return res.status(400).send({
      status: "OK",
      message: "Ride Successfully created",
      statusCode: 201,
      ride_id: newRide._id,
    });
  } catch (error) {
    return res.status(500).send({
      status: "ERROR",
      statusCode: 500,
      message: error.message,
    });
  }
};

module.exports = {
  createRide,
};
