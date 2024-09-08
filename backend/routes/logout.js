import userDataResponse from "../Response.js";
import sampleresponse from "../sampleresponse.js";

const logout = (req,res)=>{
    const userResponse = {...userDataResponse};
    res.clearCookie('_tokenlocalhost',{
        httpOnly:true,
        sameSite: 'None',
        secure:true
    })
    userResponse.logout=true;
    return res.status(200).json(userResponse);
}

export default logout;