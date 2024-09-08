import userDataResponse from "../Response.js";
import otpdata from '../utils/otpstore.js';
import userModel from "../Database/usermodel.js";
import Generatejwttoken from "../utils/jwttoken.js";

const login = async (req, res) => {
    const userResponse = {...userDataResponse};
    const userData = req.body;


    if (userData.otp == otpdata.otp && userData.email === otpdata.email) {
        userResponse.otpverified = true;

        try {
            // Find user by email
            const user = await userModel.findOne({ email: userData.email });
            if (user) {
                userResponse.existinguser = true;
                userResponse.userFound = true;
                userResponse.userData = user;
                const data = Generatejwttoken(user);
                res.cookie('_tokenlocalhost', data.token, data.options);
                userResponse.token = data.token; // Use the token from the response directly
                return res.status(200).json(userResponse);
            } else {
                userResponse.userFound = false;
                userResponse.userData.email = userData.email;
                return res.status(200).json(userResponse); // Return 200 even if user not found
            }
        } catch (error) {
            console.error('Error in checkotp:', error);
            userResponse.error = error.message;
            return res.status(500).json(userResponse);
        }
    } else {
        userResponse.otpverified = false;
        return res.status(200).json(userResponse); // Use 400 for invalid request
    }
};

export default login;
