const { createRide } = require("./make_rides");
const { completeRide } = require("./complete_ride");
const {
  updateRideStatus,
  updatePaymentStatus,
  updatePaymentType,
  updateRiderCondition,
} = require("./ride_update_action");

module.exports = Object.freeze({
  createRide,
  completeRide,
  updateRideStatus,
  updatePaymentType,
  updatePaymentStatus,
  updateRiderCondition,
});
