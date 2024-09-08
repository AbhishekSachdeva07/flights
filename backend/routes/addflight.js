import flightmodel from "../Database/flightsmodel.js";
import userDataResponse from "../Response.js";

const addflight = async(req,res)=>{
    const userResponse = {...userDataResponse};
    const flightdata = req.body;
    try{
        const checkflight = await flightmodel.findOne({
            'flight_details.tripid':flightdata.flight_details.tripid
        })
        if(checkflight==null){
            const flightdatamodel = flightmodel(flightdata);
            await flightdatamodel.save();
            userResponse.flightdataadded = true;
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.flightdataadded = true;
            return res.status(200).json(userResponse);
        }
    }
    catch(error){
        userResponse.error = error.message;
        return res.status(500).json(userResponse);
    }
}

export default addflight;