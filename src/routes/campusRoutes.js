const router = require("express").Router();
const { getCampusList } = require("../controller/campus");

router.get("/campuses", getCampusList);

module.exports = router;