const {
  updateRideStatus,
  updatePaymentStatus,
  updatePaymentType,
  updateRiderCondition,
} = require("./index");

const rideUpdates = async (req, res) => {
  const { update } = req.body;

  if (update === "condition") {
    return await updateRiderCondition(req, res);
  } else if (update === "ride") {
    return await updateRideStatus(req, res);
  } else if (update === "paymentType") {
    return await updatePaymentType(req, res);
  } else if (update === "paymentStatus") {
    return await updatePaymentStatus(req, res);
  } else {
    res.status(400).json({ message: "Invalid update provided" });
  }
};

module.exports = rideUpdates;
