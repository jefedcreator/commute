const Ride = require("../../models/ridesSchama");

module.exports = async(req,res) => {
    try{
        const allRides = await Ride.find({})

        return res.status(200).send({
            status: 'OK',
            statusCode: 200,
            message: 'all rides gotten',
            payload: allRides,
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