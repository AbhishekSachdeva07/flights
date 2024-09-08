import userDataResponse from "../Response.js";
import flightmodel from "../Database/flightsmodel.js";
import flightaccepted from "../Helpers/flightacceptedmail.js";
import userModel from "../Database/usermodel.js";

const acceptuser = async (req, res) => {
    const userResponse = { ...userDataResponse };
    const flightid = decodeURIComponent(req.params.flightid);
    const userid =req.params.userid;

    try {
        // Finding the flight
        const findflight = await flightmodel.findOne({
            'flight_details.tripid': flightid
        });

        if (findflight) {
            const userIndex = findflight.userapplied.findIndex(user => user.cliendid.toString() === userid);

            if (userIndex === -1) {
                userResponse.error = "User not applied";
                userResponse.adminaccepteduser = false;
                return res.status(404).json(userResponse);
            } else {
                const user = findflight.userapplied[userIndex];
                
                findflight.userapplied = findflight.userapplied.filter(user => user.cliendid.toString() !== userid);
            
                findflight.useraccepted.push(user);
                
                await findflight.save();
                userResponse.adminaccepteduser = true;
                const finduseremail = await userModel.findOne({
                    _id: userid
                })
                flightaccepted(finduseremail.email);
                return res.status(200).json(userResponse);
            }
        } else {
            userResponse.error = "Flight not found";
            userResponse.adminaccepteduser = false;
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        userResponse.error = error.message;
        userResponse.adminaccepteduser = false;
        return res.status(500).json(userResponse);
    }
};

export default acceptuser;
