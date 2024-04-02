const { campusList } = require("../../utils/campus_file");

module.exports = async(req,res) => {
    try{

        return res.status(200).send({
            status: 'OK',
            statusCode: 200,
            message: 'campus list',
            payload: campusList,
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