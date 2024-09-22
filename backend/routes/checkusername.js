import userDataResponse from "../Response.js";
import userModel from "../Database/usermodel.js";

const checkusername = async(req,res)=>{
    const data = req.params;
    const userResponse = {...userDataResponse};

    try{
        const finding = await userModel.findOne({
            username:data.username
        });
        if(finding==null){
            userResponse.usernameavailable = true;
            return res.status(200).json(userResponse);
        }
        else{
            userResponse.usernameavailable = false;
            return res.status(200).json(userResponse);
        }
    }
    catch(error){
        userResponse.error = error.message;
        userResponse.usernameavailable = false;
        return res.status(500).json(userResponse);
    }
}

export default checkusername;