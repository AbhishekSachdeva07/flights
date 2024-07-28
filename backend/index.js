// imports packages
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// import modules
import Mongoose from "./Database/Mongoose.js";
import userModel from "./Database/Models.js";
import Sendemail from "./Helpers/Sendemail.js"
import Generatejwttoken from "./utils/jwttoken.js"

//app functionalities
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://finalproject-five-bay.vercel.app',
    credentials: true // Allow cookies and headers from frontend
}));
app.use(cookieParser());

// Connect to MongoDB
Mongoose();

// Define User Model
const userData = userModel;

app.get('/check-for-token', (req, res) => {
    const dataa = {
        token: '',
        isverifiedtoken: false,
        email: '',
        username: ''
    };
    if (req.cookies._tokenlocalhost) {
        const tokendata = req.cookies._tokenlocalhost;
        dataa.token = tokendata;
        jsonwebtoken.verify(tokendata, process.env.SECRET, (err, user) => {
            if (user) {
                dataa.isverifiedtoken = true;
                dataa.email = user.email;
                dataa.username = user.username;
            }
        });
    } else {
        //console.log("no token found");
    }
    res.status(200).json(dataa);
});

const otppp = {
    otp: ''
}
app.post('/otp', (req, res) => {
    const otpp = Math.floor(1000 + Math.random() * 9000);
    otppp.otp = otpp;
    Sendemail(req.body.email,otpp);
});

app.post('/add-data',async(req,res)=>{
        const data = {
            userAdded: false,
            duplicateEntry: true,
            _tokenlocalhost:""
        }
        try {
            //checking user with username
            const sameUsername = await userData.findOne({'username':req.body.username});
            if(sameUsername)
            {
                data.duplicateEntry = true;
                res.status(200).json(data);
            }
            else
            {
                const newUser = new userData(req.body);
                await newUser.save();
                console.log("data added");
                const token = Generatejwttoken(newUser);
                res.cookie("_tokenlocalhost", token.token,token.options);
                data.userAdded = true;
                data.duplicateEntry = false;
                data._tokenlocalhost = req.cookies._tokenlocalhost;
                res.status(200).json(data);
            }
            // details.token = token;
        } catch (error) {
            console.log("Error in adding data:", error);
        }
        // res.status(200).json(data);
})

app.post('/check-otp', async (req, res) => {
    const details = {
        existinguser: false,
        otpverified: false,
        token: ""
    };
    if (req.body.otp == otppp.otp) {
        details.otpverified = true;
    }
    const email = req.body.email;
    try {
        // Find user by email
        const user = await userData.findOne({ email });
        if (user) {
            details.existinguser = true;
            const data = Generatejwttoken(user);
            res.cookie('_tokenlocalhost',data.token,data.options);
            details.token = req.cookies._tokenlocalhost
        } else {
            //nothing to perform
        }
    } catch (error) {
        console.error("Error checking user:", error);
    }
    // Send response after processing
    res.status(200).json(details);
});

app.get('/logout',(req,res)=>{
    res.clearCookie('_tokenlocalhost',{
        httpOnly:true,
        sameSite: 'Lax',
        secure:false
    })
    res.status(200).json({message:"logout done"});
})

//start the server
const startServer = async () => {
    await app.listen(5000, () => {
        console.log("App started at port 5000");
    });
};
startServer();
