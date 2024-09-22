import userDataResponse from "../Response.js";
import flightmodel from "../Database/flightsmodel.js";
import timemanage from "../Helpers/timemanage.js"
import userModel from "../Database/usermodel.js";

const getotherusers = async(req,res)=>{
    const userid = req.params.id;
    const flightdetails = req.body;
    const userResponse = {...userDataResponse};
    
    //making changes for dates
    const [hour,min,sec] = flightdetails.to.arrival_time.split(':').map(Number);
    const [year,month,date] = flightdetails.to.arrival_date.split('-').map(Number);
    
    const endtime = timemanage.getplustime(hour,min,sec);
    const starttime = timemanage.getminustime(hour,min,sec);

    try{
        const otherflights = await flightmodel.find({
            'flight_details.tripid' : {$ne: flightdetails.flight_details.tripid},
            'to.location' : flightdetails.to.location,
            'to.arrival_time' : {
                $gte: starttime,
                $lte: endtime
        }})
        const userAcceptedfromothers = otherflights.flatMap(flight=>
            flight.useraccepted.map(async(user)=>{
                //finding userdetails
                const finduser = await userModel.findById(user.cliendid);
                if(finduser){
                    return {
                        'userDetails' : finduser,
                        'custype': user.userdetails.custype,
                        'destination': user.userdetails.destination
                    }
                }
                return null;
            })
        )
        const userAccepted = (await Promise.all(userAcceptedfromothers)).filter(Boolean);
        console.log(userAccepted)
        if(userAccepted.length>0){
            userResponse.otherflightusers = true;
            userResponse.otherflightusersdetails = userAccepted;
            return res.status(200).json(userResponse);
        }
        userResponse.otherflightusers=true;
        userResponse.error = "No users exist";
        return res.status(404).json(userResponse);
    }
    catch(error){
        userResponse.otherflightusers=false;
        userResponse.error = "Error occured";
        return res.status(500).json(userResponse);
    }
}

export default getotherusers;