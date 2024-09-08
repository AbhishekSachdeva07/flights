import jsonwebtoken from "jsonwebtoken";
import userDataResponse from "../Response.js";

const checktoken = (req, res) => {
    const userResponse = {...userDataResponse};
    const tokendata = req.cookies._tokenlocalhost;
    try{
        if (tokendata) {
            userResponse.token = tokendata;
            const user = jsonwebtoken.verify(tokendata, process.env.SECRET, (err, user) => {
            if (user) {
                userResponse.isverifiedtoken = true;
                userResponse.userData = user.userData;
                return res.status(200).json(userResponse);                     
            }
            else{
                userResponse.isverifiedtoken = false; 
                return res.status(404).json(userResponse);
            }
        })}
        else 
        {
            userResponse.isverifiedtoken = false;
            return res.status(404).json(userResponse);   
        }
    }
    catch(error)
    {
        userResponse.error = error.message;
        userResponse.isverifiedtoken = false;
        return res.status(500).json(userResponse);
    }
}

export default checktoken;