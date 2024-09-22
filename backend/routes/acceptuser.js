import userDataResponse from "../Response.js";
import flightmodel from "../Database/flightsmodel.js";
import flightaccepted from "../Helpers/flightacceptedmail.js";
import userModel from "../Database/usermodel.js";

const acceptuser = async (req, res) => {
    const userResponse = { ...userDataResponse };
    const flightid = decodeURIComponent(req.params.flightid);
    const userid = req.params.userid;

    try {
        const findflight = await flightmodel.findOne({
            'flight_details.tripid': flightid
        });

        if (!findflight) {
            userResponse.error = "Flight not found";
            userResponse.adminaccepteduser = false;
            return res.status(404).json(userResponse);
        }

        const userIndex = findflight.userapplied.findIndex(user => user.cliendid.toString() === userid);

        if (userIndex === -1) {
            userResponse.error = "User not applied";
            userResponse.adminaccepteduser = false;
            return res.status(404).json(userResponse);
        }

        const user = findflight.userapplied[userIndex];

        findflight.userapplied = findflight.userapplied.filter(user => user.cliendid.toString() !== userid);
        findflight.useraccepted.push(user);

        await findflight.save();

        const finduseremail = await userModel.findOne({ _id: userid });

        if (!finduseremail) {
            userResponse.error = "User not found";
            userResponse.adminaccepteduser = false;
            return res.status(404).json(userResponse);
        }

        finduseremail.flightsapplied = finduseremail.flightsapplied.filter(flight => flight.flightid.toString() !== findflight._id.toString());

        finduseremail.flightsaccepted.push({
            flightid: findflight._id
        });

        await finduseremail.save();

        flightaccepted(finduseremail.email, finduseremail.username);

        userResponse.adminaccepteduser = true;
        return res.status(200).json(userResponse);

    } catch (error) {
        userResponse.error = error.message;
        userResponse.adminaccepteduser = false;
        return res.status(500).json(userResponse);
    }
};

export default acceptuser;
