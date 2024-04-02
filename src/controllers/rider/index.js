const { model } = require('mongoose')
const { createRider } = require('./create_rider')
const loginRider  = require('./login_rider')
const getRider = require('./get_rider')

module.exports = Object.freeze({
    createRider,
    loginRider,
    getRider
})