import otpdata from '../utils/otpstore.js';
import Generateotp from '../utils/Generateotp.js';
import Sendemail from '../Helpers/Sendemail.js';
import userDataResponse from '../Response.js';
const sendOtp = async(req,res)=>{
    const userResponse = {...userDataResponse};
    const userData = req.body;
    otpdata.email = userData.email;
    otpdata.otp = Generateotp();
    Sendemail(otpdata.email,otpdata.otp);
    userResponse.otpsent = true;
    res.status(200).json(userResponse);
}

export default sendOtp;