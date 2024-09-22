import flightmodel from "../Database/flightsmodel.js";
import userModel from "../Database/usermodel.js";
import userDataResponse from "../Response.js";

const addusertoflight = async(req, res) => {
    const userResponse = { ...userDataResponse };
    const id  = decodeURIComponent(req.params.id); 
    const username = decodeURIComponent(req.params.username);
    const userData = req.body;  
    console.log(userData);
    try {
        console.log(id);
        // Find the flight by flight number
        const findflight = await flightmodel.findOne({
            'flight_details.tripid': id
        });

        // Check if the flight exists
        if (findflight==null) {
            userResponse.error = "Flight not found";
            userResponse.useraddedtoflight = false;
            return res.status(404).json(userResponse);
        }

        findflight.userapplied.push(userData);

        const finduser = await userModel.findOne({
            username:username
        });
        if(finduser){
            finduser.flightsapplied.push({
                flightid: findflight._id
            })
        }
        await findflight.save();
        await finduser.save(); // Save the updated flight document
       
        // Respond with success
        userResponse.useraddedtoflight = true;
        return res.status(200).json(userResponse);
    } catch (error) {
        // Handle any errors
        userResponse.error = error.message;
        userResponse.useraddedtoflight = false;
        return res.status(500).json(userResponse);
    }
};

export default addusertoflight;
