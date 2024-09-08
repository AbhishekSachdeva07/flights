import cloudinary from "cloudinary"
import userDataResponse from "../Response.js";

cloudinary.v2.config({
    cloud_name: 'dxbfhdvv7',
    api_key: '718933138718255',
    api_secret: 'ZsFjiS1wHggvVqY8F5NXWZS6TFU'
});

const uploadimage = async(req,res)=>{

    const file = req.file;
    const userResponse = {...userDataResponse};
    if(!file){
        userResponse.imageuploaded = false;
        return res.status(404).json(userResponse);
    }
    try{
        const result = await cloudinary.uploader.upload(file.path,{
            resourse_type: "auto"
        });
        console.log(result);
        userResponse.imageuploaded = true;
        userResponse.imageurl = result.secure_url;
        return res.status(200).json(userResponse);

    }catch(error){
        userResponse.imageuploaded = false;
        userResponse.error = error.message;
        return res.status(404).json(userResponse);
    }
}

export default uploadimage;