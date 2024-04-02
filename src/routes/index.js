const express = require('express');
const router = express.Router();

const riderRoutes = require('./riderRoutes');
const userRoutes = require('./userRoutes');
const rideRoutes = require('./rideRoutes')
const campusRoutes = require('./campusRoutes')

router.use('/rider', riderRoutes);  
router.use('/user', userRoutes);
router.use('/ride', rideRoutes);
router.use('/campus', campusRoutes);

module.exports = router;
