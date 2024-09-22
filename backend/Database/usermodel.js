import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum: ['male','female','others']
    },
    profilephoto:{
        type:String,
        required:true,
    },
    flightsapplied:[
        {
            flightid:{
                type: mongoose.Schema.ObjectId,
                required:true
            }
        }
    ],
    flightsaccepted:[
        {
            flightid:{
                type: mongoose.Schema.ObjectId,
                required:true
            }
        }
    ]
},{timestamps:true});

const userModel = mongoose.model("userModel",UserSchema);

export default userModel;