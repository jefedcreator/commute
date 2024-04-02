const Rider = require("../../models/riderSchema");

module.exports = async(req,res) => {
    try{
        const getRider = await Rider.find(req.query)

        return res.status(200).send({
            status: 'OK',
            statusCode: 200,
            message: 'Rider profile gotten',
            payload: getRider,
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