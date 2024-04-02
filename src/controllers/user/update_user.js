const User = require('../../models/userSchema');

module.exports = async(req,res) => {
    try{

        const value = req.body;

        const phonenumber = value.phonenumber
        const profileImage = value.profileImage
        const notificationId = value.notificationId
        const campusAddressInfo = value.campusAddressInfo

        const findPhone = await User.findOne({phonenumber: phonenumber})
        const user = await User.findOne({_id: req.decoded.id});

        if(findPhone && phonenumber != user.phonenumber){
            return res.status(400).send({status:"ERROR", statusCode: 400, message: `This Phonenumber ${phonenumber} is been associated with a user.`})
        }

        else {
             await user.updateOne({
                profileImage: profileImage || user.profileImage,
                phonenumber: phonenumber || user.phonenumber,
                notificationId: notificationId || user.notificationId,
                campusAddressInfo: campusAddressInfo || user.campusAddressInfo
            })

            return res.status(200).send({
                status: 'OK',
                statusCode: 200,
                message: 'user profile updated successfuly'
            })
        }
    }
    catch (error)
    {
        
        return res.status(500).send({
            status: 'ERROR',
            statusCode: 500,
            message: error.message,
            error: error
        })
    }
}