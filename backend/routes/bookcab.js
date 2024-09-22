import Cabmodel from "../Database/cabmodel.js";
import userDataResponse from "../Response.js";

const bookcab = async(req,res)=>{
    const {cityname,cabnumber} = req.params;
    const userResponse = {...userDataResponse};

    try{
        const data = await Cabmodel.findOne({
            "location": cityname.toLowerCase()
        })
        console.log("fucked:",data);
        if(data){
            const cab = data.cabsavailable.find(cabd=>cabd.cabno === cabnumber.toUpperCase());
            if(cab){
                cab.cabdestination = cityname.toLowerCase();
                data.cabsbooked.push(cab);
                data.cabsavailable = data.cabsavailable.filter(cabd=> cabd.cabno != cabnumber.toUpperCase());
                await data.save();
                userResponse.cabbooked = true;
                return res.status(200).json(userResponse);
            }
            else{
                userResponse.cabbooked = false;
                return res.status(200).json(userResponse);
            }
        }
        else{
            userResponse.cabbooked = false;
            return res.status(200).json(userResponse);
        }
    }
    catch(error){
        console.log("error occured checking for cabs.");
        userResponse.error = error;
        return res.status(500).json(userResponse);
    }
}

export default bookcab;