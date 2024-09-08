import flightmodel from "../Database/flightsmodel.js";
import userDataResponse from "../Response.js";

const checkinguseraccepted = async (req, res) => {
    const userResponse = { ...userDataResponse };
    const userid  = req.params.userid;
    const flightdata = req.body;

    try {
        // Finding the flight
        const findingdata = await flightmodel.findOne({
            'flight_details.tripid': flightdata.flight_details.tripid
        });

        if (findingdata) {
            // Ensure cliendid is compared correctly
            const checkinguser = findingdata.useraccepted.filter(user => user.cliendid.toString() === userid);

            if (checkinguser.length === 0) {
                userResponse.useraccepted = false;
            } else {
                userResponse.useraccepted = true;
            }

            return res.status(200).json(userResponse);
        } else {
            userResponse.error = "Flight not found";
            userResponse.useraccepted = false;
            return res.status(404).json(userResponse);
        }
    } catch (error) {
        console.error("Error in checkinguseraccepted function:", error);
        userResponse.error = error.message;
        userResponse.useraccepted = false;
        return res.status(500).json(userResponse);
    }
};

export default checkinguseraccepted;
