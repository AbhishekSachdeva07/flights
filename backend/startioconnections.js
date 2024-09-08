import { Server } from "socket.io";
import Chatmodel from "./Database/Chatmodel.js";

// Function to get chat history
const getchathist = async (sender, reciever, flightid) => {
    // Find chat documents where either sender or receiver is involved in the specified flight
    const chats = await Chatmodel.find({
        'flights.flightid': flightid,
        $or: [
            { 'senderid': sender },
            { 'senderid': reciever }
        ]
    });

    const chatHistory = [];

    if (chats) {
        chats.forEach(chat => {
            // Check for the flight and messages for sender
            if (chat.senderid === sender) {
                const flight = chat.flights.find(flight => flight.flightid === flightid);
                if (flight) {
                    const receiverData = flight.recievers.find(reciv => reciv.recieverid === reciever);
                    if (receiverData && Array.isArray(receiverData.messages)) {
                        receiverData.messages.forEach(message => {
                            chatHistory.push({
                                message: message.themessage,
                                username: sender,
                                timestamps: message.timestamps
                            });
                        });
                    } else {
                        console.log('No messages found or messages is not an array for:', receiverData);
                    }
                }
            }
            
            // Check for the flight and messages for receiver
            if (chat.senderid === reciever) {
                const flight = chat.flights.find(flight => flight.flightid === flightid);
                if (flight) {
                    const senderData = flight.recievers.find(reciv => reciv.recieverid === sender);
                    if (senderData && Array.isArray(senderData.messages)) {
                        senderData.messages.forEach(message => {
                            chatHistory.push({
                                message: message.themessage,
                                username: reciever,
                                timestamps: message.timestamps
                            });
                        });
                    } else {
                        console.log('No messages found or messages is not an array for:', senderData);
                    }
                }
            }
        });
    }

    chatHistory.sort((a, b) => new Date(a.timestamps) - new Date(b.timestamps));

    return chatHistory;
};


// Function to add data to the database
const adddatatodb = async (sender, reciver, message, flightid) => {
    const findsender = await Chatmodel.findOne({ senderid: sender });

    try {
        if (!findsender) {
            // Create a new chat entry if not found
            const newChat = new Chatmodel({
                senderid: sender,
                flights:[
                    {
                        flightid:flightid,
                        recievers: [{
                            recieverid: reciver,
                            messages: [{ themessage: message }]
                        }]
                    }
                ]
            });
            await newChat.save();
        } else {
            const receiveflightid = findsender.flights.find(flight=>flight.flightid === flightid);
            if(!receiveflightid){
                findsender.flights.push({
                    flightid: flightid,
                    recievers:[
                        {
                            recieverid:reciver,
                            messages:[
                                {
                                    themessage:message
                                }
                            ]
                        }
                    ]
                })
            }
            else{
                const receiverEntry = receiveflightid.recievers.find(rec => rec.recieverid === reciver);

                if (!receiverEntry) {
                    receiveflightid.recievers.push({
                        recieverid: reciver,
                        messages: [{ themessage: message }]
                    });
                } else {
                    receiverEntry.messages.push({
                        themessage: message
                    });
                }
            }

            await findsender.save();
        }
    } catch (error) {
        console.error("Error saving chat data:", error);
    }
};

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
        socket.on("join", (username) => {
            users[username] = socket.id;
        });

        socket.on("start-indiv-chat", async (username, recievername,flightid) => {
            const chatHistory = await getchathist(username, recievername,flightid);
            console.log(chatHistory);
            socket.emit("chat-history", chatHistory);
        });

        socket.on("send-indiv-chat", async (username, recievername, message,flightid) => {
            const socketid = users[recievername];

            // Add message to DB
            await adddatatodb(username, recievername, message,flightid);

            if (socketid) {
                io.to(socketid).emit("private-message", { username, message });
            }
        });

        socket.on("disconnect", () => {
            for (let username in users) {
                if (users[username] === socket.id) {
                    delete users[username];
                    break;
                }
            }
        });
    });
};

export default startioconnections;
