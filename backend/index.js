// imports packages
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import {Server} from 'socket.io'
import {createServer} from 'http'

// Load environment variables
dotenv.config();

// import modules
import Mongoose from "./Database/Mongoose.js";
import userModel from "./Database/usermodel.js";
import checktoken from "./routes/checktoken.js";
import sendOtp from "./routes/sendOtp.js";
import logout from './routes/logout.js'
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import findflights from "./routes/findflights.js";
import uploadimage from "./routes/uploadimage.js";
import checkusername from "./routes/checkusername.js";
import addflight from "./routes/addflight.js";
import checkflightuser from "./routes/checkflightuser.js";
import addusertoflight from "./routes/addusertoflight.js";
import checkinguseraccepted from "./routes/checkinguseraccepted.js";
import acceptuser from "./routes/acceptuser.js";
import getusers from "./routes/getusers.js";

//import multer
import mult from "./Helpers/Multer.js";
import startioconnections from "./startioconnections.js";

//app functionalities
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies and headers from frontend
}));
app.use(cookieParser());

//create server from http
const server = createServer(app);


// Connect to MongoDB
Mongoose();

// creating and starting io connections
startioconnections(server);

app.get('/check-for-token', checktoken);
app.post('/otp',sendOtp);
app.post('/login', login);
app.get('/check-username/:username',checkusername);
app.post('/upload-image',mult.single('image'),uploadimage);
app.post('/signup',signup);
app.get('/logout',logout);
app.get('/flights/:state/:city/:date',findflights);
app.post('/add-flight',addflight);
app.post('/flight/checkuser/flightsapplied/:id',checkflightuser);
app.post('/flight/adduser/flightapplied/:id',addusertoflight);
app.post('/flight/useraccepted/:userid',checkinguseraccepted);
app.get('/acceptuser/:flightid/:userid',acceptuser);
app.post('/getusers/:userid',getusers);

//start the server
const startServer = async () => {
    try{
        await server.listen(5000, () => {
            console.log("App started at port 5000");
        });
    }
    catch(error){
        console.error("Server not started");
    }
};
startServer();
