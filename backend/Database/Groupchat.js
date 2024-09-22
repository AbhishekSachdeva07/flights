import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema({
    flightid:{
        type:String,
        required:true
    },
    chats:[
        {
            senderid:{
                type:String,
                required:true
            },
            messages:[
                {
                    themessage:{
                        type:String,
                        required:true
                    },
                    timestamps:{
                        type:Date,
                        default: Date.now,
                        expires: '1d'
                    }
                }
            ]
        }
    ]
},{timestamps:true});

const Groupchatmodel = mongoose.model("groupchat",groupChatSchema);

export default Groupchatmodel;