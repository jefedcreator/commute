const User = require("../../models/userSchema");

module.exports = async(req,res) => {
    try{
        const { id } = req.params

        const excludedFields = ["-password"]

        const getUser = await User.findOne({ _id: id }, excludedFields)

        return res.status(200).send({
            status: 'OK',
            statusCode: 200,
            message: 'User profile gotten',
            payload: getUser,
        })

    }
    catch(error){
        return res.status(500).send({
            status: 'ERROR',
            statusCode: 500,
            message: error.message
        })
    }
}