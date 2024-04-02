module.exports = async(req,res) => {
    try{    
        const {distance, time, address,} = req.body;

        let setDistance = distance * 50;
        let settime = time * 14;

        if(distance < 2) {
            setDistance = 100;
            settime = 100;
        }

        // let a = campusList;
        
        // const filterAddress = a.find((elem)=> elem == address)
        // if(filterAddress){
        //     calculatedDistance = 600
        // }

        // else {
        //     sumFare = calculatedDistance
        // }

        return res.status(200).send({
            status: "OK",
            statusCode:200,
            message: "Delivery cost",
            payload: setDistance + settime
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