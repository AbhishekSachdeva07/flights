import flightmodel from "../Database/flightsmodel.js";
import userDataResponse from "../Response.js";

const checkflightuser = async(req,res)=>{
    const userResponse = {...userDataResponse};
    const { id } = req.params;
    const flightdata = req.body;
    const checkuser = await flightmodel.findOne({
        'flight_details.tripid': flightdata.flight_details.tripid
    })

    try{
        if(checkuser!=null){
            const userdata = checkuser.userapplied.filter(flight => flight.cliendid.toString() === id);
            if (userdata.length === 0) {
                userResponse.useralreadyapplied = false;
                return res.status(200).json(userResponse);
            }
            userResponse.useralreadyapplied = true;
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.useralreadyapplied = true;
            userResponse.error = "Error occured";
            return res.status(404).json(userResponse);
        }
    }
    catch(error){
        userResponse.useralreadyapplied = true;
        userResponse.error = error.message;
    } 
}

export default checkflightuser;