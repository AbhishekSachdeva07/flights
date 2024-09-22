import { Server } from "socket.io";
import Chatmodel from "../Database/Chatmodel.js";



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

export default {getchathist,adddatatodb};