
import Groupchatmodel from "../Database/Groupchat.js"



const getchatHistgroup = async (sender,flightid) => {
    const chatHist = [];
    const findingflight = await Groupchatmodel.findOne({
        "flightid":flightid
    });
    if(findingflight){
        const chatswithsender = findingflight.chats.find(sender=> sender.senderid === sender);
        if(chatswithsender){
            chatswithsender.messages.forEach(message=>{
                chatHist.push({
                    username: sender,
                    message: message.themessage,
                    timestamps: message.timestamps
                })
            })
        }
        //other users
        const otherchatusers = findingflight.chats.filter(sender=> sender.senderid!=sender);
        if(otherchatusers){
            otherchatusers.forEach(users=>{
                users.messages.forEach(message=>{
                    chatHist.push({
                        username: users.senderid,
                        message: message.themessage,
                        timestamps: message.timestamps
                    })
                })
            })
        }
    }

    chatHist.sort((a,b)=> new Date(a.timestamps) - new Date(b.timestamps));
    return chatHist;
}

const addGrouptodb = async(sender,message,flightid) => {
    //check for existing flight id in db
    const getflight = await Groupchatmodel.findOne({
        'flightid':flightid
    })
    if(!getflight){
        const newData = new Groupchatmodel({
            flightid: flightid,
            chats: [
                {
                    senderid: sender,
                    messages: [
                        {  
                            themessage: message
                        }
                    ]
                }
            ]
        })
        await newData.save();
    }
    else{
        //check whether user present
        const sendinguser = getflight.chats.find(sender=> sender.senderid === sender);
        if(!sendinguser){
            //first time user to send message
            getflight.chats.push({
                senderid: sender,
                messages:[
                    {
                        themessage:message
                    }
                ]
            })
            await getflight.save();
        }
        else{
            sendinguser.messages.push({
                themessage:message
            })
            await getflight.save();
        }
    }
}

export default {getchatHistgroup,addGrouptodb};