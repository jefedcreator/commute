const Ride = require("../../models/ridesSchama");

module.exports = async (req, res) => {
  try {
    const { rideId, rideStatus } = req.body;

    const getRide = await Ride.find({
      _id: rideId,
      rideStatus: rideStatus,
    });

    return res.status(200).send({
      status: "OK",
      statusCode: 200,
      message: "Ride gotten",
      payload: getRide,
    });
  } catch (error) {
    return res.status(500).send({
      status: "ERROR",
      statusCode: 500,
      message: error.message,
    });
  }
};
