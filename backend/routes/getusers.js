import flightmodel from "../Database/flightsmodel.js";
import userDataResponse from "../Response.js";
import userModel from "../Database/usermodel.js";

const getusers = async(req,res)=>{
    const userResponse = {...userDataResponse};
    const userid = req.params.userid;
    const flightdetails = req.body;
    try{
        const useraccepted = await flightmodel.findOne({
            'flight_details.tripid':flightdetails.flight_details.tripid
        });
        if(useraccepted===null){
            userResponse.error = "flight not found";
            userResponse.flightusersfetched = false;
            return res.status(404).json(userResponse);
        }
        const usersaccepted = useraccepted.useraccepted.filter(user=>user.cliendid.toString()!=userid);
        const userIds = usersaccepted.map(user => user.cliendid);
        const alluserdata = await userModel.find({
            _id: {$in:userIds}
        })
        userResponse.flightuserdetails = alluserdata;
        userResponse.flightusersfetched = true;
        return res.status(200).json(userResponse);
    }
    catch(error){
        userResponse.flightusersfetched = false;
        userResponse.error = error.message;
        return res.status(500).json(userResponse);
    }
}

export default getusers;