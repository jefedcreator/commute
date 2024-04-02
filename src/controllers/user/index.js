const { createUser } = require('./create_user')
const loginUser  = require('./login_user')
const getUser  = require('./get_user')
const updateUser = require('./update_user')

module.exports = Object.freeze({
    createUser,
    loginUser,
    getUser,
    updateUser
})