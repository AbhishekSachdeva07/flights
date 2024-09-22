import { Server } from "socket.io";
import Chatmodel from "./Database/Chatmodel.js";
import Groupchatmodel from "./Database/Groupchat.js"
import Cabmodel from "./Database/cabmodel.js";
import axios from "axios"
import dotenv from "dotenv"
import {GoogleGenerativeAI} from "@google/generative-ai";

//importing functions
import Geminifunctions from "./socketfunctions/Geminifunctions.js";
import Groupchatfunctions from "./socketfunctions/Groupchatfunctions.js";
import IndividualChat from "./socketfunctions/IndividualChat.js";
import cabbooked from "./Helpers/cabbooked.js";
import cabRejected from "./Helpers/cabrejected.js";


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI);
const geminimodel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




// Start socket.io connections
const startioconnections = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    const users = {};

    io.on("connection", (socket) => {
        //individual
        socket.on("join", (username) => {
            users[username] = socket.id;
        });
        socket.on("start-indiv-chat", async (username, recievername,flightid) => {
            const chatHistory = await IndividualChat.getchathist(username, recievername,flightid);
            socket.emit("chat-history", chatHistory);
        });
        socket.on("send-indiv-chat", async (username, recievername, message,flightid) => {
            const socketid = users[recievername];

            // Add message to DB
            await IndividualChat.adddatatodb(username, recievername, message,flightid);

            if (socketid) {
                io.to(socketid).emit("private-message", { username, message });
            }
        });


        //group
        socket.on("join-group-chat",(username,flightid)=>{
            socket.join(flightid);
        })
        socket.on("start-group-chat", async(username,flightid)=>{
            const getChatHist = await Groupchatfunctions.getchatHistgroup(username,flightid);
            socket.emit("chat-history", getChatHist);
        })
        socket.on("send-group-chat", async(username,message,flightid)=>{
            await Groupchatfunctions.addGrouptodb(username,message,flightid);
            socket.broadcast.to(flightid).emit("group-message",{username,message,flightid});
        })

        
        //gemini
        socket.on("join-gemini",async(username,flightid)=>{
            users[username] = socket.id;
            const message = `Welcome ${username}. How can we help you?\n1. Use '/bookcab' to start booking the cab process.\n2. Ask about any location from our Gemini AI chatbot.\n3. Use '/help' for contacting to our team.`;
            socket.emit("welcome-msg",{'username':'gemini',message});
            await Geminifunctions.savegeminitoDb("gemini",username,message,flightid);
        })
        socket.on("join-socket",(username)=>{
            users[username] = socket.id;
        })

        socket.on("gemini-chat-start",async(username,recievername,flightid)=>{
            const chatHistory = await IndividualChat.getchathist(username, "gemini",flightid);
            socket.emit("gemini-chat-hist", chatHistory);
        })

        socket.on("send-gemini-msg",async(username,message,tripid,email)=>{
            await IndividualChat.adddatatodb(username, "gemini", message,tripid);
            const socketid = users[username];
            const messageformat = {
                username: "gemini",
                message: message
            }

            if(message==="/bookcab"){
                messageformat.message = "Let us know the total number of people you want to book cab for. \n Reply as '/bookcab 5' where 5 is count of people.";
                await IndividualChat.adddatatodb("gemini", "username", messageformat.message,tripid);
            }
            else if(message.startsWith("/bookcab ")){
                const number = parseInt(message.slice(9).trim());
                messageformat.message = `Ok. Let us know the location you want to go to. City name in format '/location chandigarh' where chandigarh can replaced with another city name.`;
                await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
            }
            else if(message.startsWith("/location")){
                const location = message.slice(10).trim();
                messageformat.message = `Ok. Looking for the cabs available. Please wait for a while.`;
                await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                io.to(socketid).emit("gemini-message",messageformat);
                //find for cabs available for that location
                const findcabs = await Cabmodel.find({
                    'location': location
                })
                if(findcabs.length===0){
                    messageformat.message = "We are really sorry. But no cabs for your location are available. We are working on it. Will soon contact you at your mail address if the cab is available before your arrival time.";
                    io.to(socketid).emit("gemini-message",messageformat);
                    await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                }
                else{
                    const cabdata = findcabs[0].cabsavailable;
                    if(!cabdata || cabdata.length === 0){
                        messageformat.message = "We are really sorry. But no cabs for your location are available. We are working on it. Will soon contact you at your mail address if the cab is available before your arrival time.";
                        //io.to(socketid).emit("gemini-message",messageformat);
                        await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                    }
                    else{
                        //get cabs details and sent it to u user.
                        messageformat.message = "";

                        for (const data of cabdata) {
                            console.log(data);
                            messageformat.message += `Cab No. ${data.cabno} is available.\nCab Type: ${data.cabtype}.\nDriver Name: ${data.cabdriver.name}.\nDriver Age: ${data.cabdriver.age}.\nThis cab is available at Rs. ${data.cabprice}.\n\n`;
                        }

                        messageformat.message += "Select from these cabs. To book a cab just enter the cab number in format '/cab/cityname/pb04vm7891'.\nMandatory */Everything in small without any space./*";

                        await IndividualChat.adddatatodb("gemini", username, messageformat.message, tripid);
                        io.to(socketid).emit("gemini-message", messageformat);
                    }
                }

                return;
            }
            else if(message.startsWith("/cab")){
                const parts = message.split('/');
                if(parts.length<3){
                    messageformat.message = "Check the command properly. Some error occured.\nMake sure you are entering the command to book like '/cab/faridkot/pb04vm7985'";
                    await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                    io.to(socketid).emit("gemini-message",messageformat);
                    return;
                }
                const cityname = message.split('/')[2];
                const cabnumber = message.split('/')[3];
                if(!cityname || !cabnumber || cityname.trim()==="" || cabnumber.trim===""){
                    messageformat.message = "Check the command properly. Some error occured.\nMake sure you are entering the command to book like '/cab/faridkot/pb04vm7985'";
                    await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                }
                else{
                    messageformat.message = "Great! Wait while we are confirming your bookings.";
                    io.to(socketid).emit("gemini-message",messageformat);
                    await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                    const cabbooking = await axios.get(`https://flights-lmrv.onrender.com/book-cab/${cityname}/${cabnumber}`,{withCredentials: true});
                    if(cabbooking.data.cabbooked){
                        messageformat.message = `Congratulations🎉🚖. Cab ${cabnumber} has been booked for you. Full details will be shared with you at your mail address i.e. ${email}`;
                        await cabbooked(email,username);
                        await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                    }
                    else{
                        messageformat.message = `Sorry🥲. Some error occured while booking your cab. Try again later may be some one booked the cab before you or it's currently unavailable. Sorry for the inconvience caused.`;
                        await cabRejected(email,username);
                        await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);
                    }
                }
            }
            else{
                try{
                    const result = await geminimodel.generateContent(message);
                    messageformat.message = result.response.text();
                    await IndividualChat.adddatatodb("gemini", username, messageformat.message,tripid);

                }
                catch(error){
                    console.log("error at gemini message",error);
                }
                
                
            }
            
            if(socketid){
                io.to(socketid).emit("gemini-message",messageformat);
            }
        })


        //disconnect
        socket.on("disconnect", () => {
            for (let username in users) {
                if (users[username] === socket.id) {
                    delete users[username];
                    break;
                }
            }
            //socket.leave(flightid);
        });
    });
};

export default startioconnections;
