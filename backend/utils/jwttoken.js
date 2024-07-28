import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv"

const Generatejwttoken = (user)=>{
    const token = jsonwebtoken.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username
        }, process.env.SECRET, { expiresIn: "5h" }
    );

    // Set the cookie with the token
    //5 * 24 * 60 * 60 * 1000
    const options = {
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 day
        httpOnly: true,
        sameSite: 'Lax', // Adjust based on your needs
        secure: false // Set to `true` for HTTPS environments
    };

    const data = {token:token,options:options};

    return data;
}

export default Generatejwttoken;