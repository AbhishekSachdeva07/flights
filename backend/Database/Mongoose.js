import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const Mongoose = async() =>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("Database Connected Successfully");
    }
    catch(error)
    {
        console.log("Database not connected -> ",error);
    }
}

export default Mongoose;