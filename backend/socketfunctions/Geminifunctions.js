import { Server } from "socket.io";
import Chatmodel from "../Database/Chatmodel.js";


const savegeminitoDb = async(sender,reciver,message,flightid)=>{
    const findgemini = await Chatmodel.findOne({
        "senderid": sender
    })
    try{
        if(!findgemini){
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
        }
        else{
            const receiveflightid = findgemini.flights.find(flight=>flight.flightid === flightid);
                if(!receiveflightid){
                    findgemini.flights.push({
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
    
                await findgemini.save();
        }  
    }
    catch(error){
        console.error("Error saving chat data:", error);
    } 
}


export default {savegeminitoDb};