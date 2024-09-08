import mongoose, { mongo } from "mongoose"

const Chatschema = new mongoose.Schema({
    senderid:{
        type:String,
        require:true
    },
    flights:[
        {
            flightid:{
                type: String,
                required:true
            },
            recievers:[
                {
                    recieverid:{
                        type: String,
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
                                default:Date.now,
                                expires: '1d'
                            }
                        }
                    ]
                }
            ]
        }
    ]
},{timestamps:true});

const Chatmodel = mongoose.model("chatmodels",Chatschema);

export default Chatmodel;