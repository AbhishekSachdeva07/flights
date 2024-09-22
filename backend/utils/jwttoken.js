import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"

const Generatejwttoken = (user)=>{
    const token = jsonwebtoken.sign(
        {
            userData:user
        }, process.env.SECRET, { expiresIn: "5d" }
    );

    // Set the cookie with the token
    //5 * 24 * 60 * 60 * 1000
    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 day
        httpOnly: true,
        sameSite: 'None', // Adjust based on your needs
        secure: true // Set to `true` for HTTPS environments
        // domain: 'finalproject-1-xqyv.onrender.com'
    };

    const data = {token:token,options:options};

    return data;
}

export default Generatejwttoken;