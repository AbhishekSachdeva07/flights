import mongoose from "mongoose";

const flightsmodel = new mongoose.Schema({
    flight_details:{
        
    },
    from:{

    },
    to:{

    },
    userapplied:[
        {
            cliendid:{
                type: mongoose.Schema.ObjectId,
                required:true
            },
            userdetails:{
                firstname:{
                    type:String,
                    required:true
                },
                secondname:{
                    type:String,
                    required:true
                },
                refnum:{
                    type:String,
                    required:true
                },
                custype:{
                    type:String,
                    required:true
                },
                destination:{
                    type:String,
                    required:true
                }
            }
        }
    ],
    useraccepted:[
        {
            cliendid:{
                type: mongoose.Schema.ObjectId,
                required:true
            },
            userdetails:{
                firstname:{
                    type:String,
                    required:true
                },
                secondname:{
                    type:String,
                    required:true
                },
                refnum:{
                    type:String,
                    required:true
                },
                custype:{
                    type:String,
                    required:true
                },
                destination:{
                    type:String,
                    required:true
                }
            }
        }
    ]
},{timestamps:true});

const flightmodel = mongoose.model("flightmodel",flightsmodel);

export default flightmodel;