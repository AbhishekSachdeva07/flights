import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    }
},{timestamps:true});

const userModel = mongoose.model("userModel",UserSchema);

export default userModel;