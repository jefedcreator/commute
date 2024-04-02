const router = require("express").Router();

const { completeRide, createRide } = require("../controller/rides");

const { RiderAuth, UserAuth, rideUpdates } = require("../middleware/");

router.post("/create", UserAuth, createRide);
router.put("/complete", RiderAuth, completeRide);
router.put(
  "/update",
  (req, res, next) => {
    if (req.headers["x-access-token"]) {
      UserAuth(req, res, next);
    } else if (req.headers["x-ride-token"]) {
      RiderAuth(req, res, next);
    } else {
      // handle other user types or throw an error
      res.status(400).json({ message: "Invalid Auth provided" });
    }
  },
  rideUpdates
);

module.exports = router;
