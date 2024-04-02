const router = require("express").Router();
const riderController = require("../controller/rider");

const {
  createRider,loginRider
} = require('../controller/rider/index');

const { RiderAuth } = require('../middleware/auth');

router.post('/signup', createRider);
router.post('/login',loginRider)

////below code should be reworked as the above...and others written in other files...

module.exports = router;
