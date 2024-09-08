import userDataResponse from "../Response.js";
import userModel from "../Database/usermodel.js";
import Generatejwttoken from "../utils/jwttoken.js";
import Welcomemail from "../Helpers/welcomemail.js";

const signup = async(req,res)=>{
    const userResponse = {...userDataResponse};
    const userData = req.body;
    try {
        //checking user with username
        const newUser = new userModel(userData);
        await newUser.save();
        const token = await Generatejwttoken(newUser);
        res.cookie("_tokenlocalhost", token.token,token.options);
        userResponse.userAdded = true;
        userResponse.userData = newUser;
        userResponse.duplicateEntry = false;
        userResponse.token = req.cookies._tokenlocalhost;
        Welcomemail(userData.email);
        return res.status(200).json(userResponse);
    } catch (error) {
        userResponse.error = error.message;
        return res.status(500).json(userResponse);
    }
}

export default signup;