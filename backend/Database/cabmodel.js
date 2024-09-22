import mongoose from "mongoose"

const CabSchema = new mongoose.Schema({
    location:{
        type:String,
        requried:true
    },
    cabsavailable:[
        {
            cabno:{
                type:String,
                required:true
            },
            cabtype:{
                type:String,
                required:true,
                enum: ['economy']
            },
            cabprice:{
                type:String,
                required:true
            },
            cabdriver:{
                name:{
                    type:String,
                    required:true
                },
                age:{
                    type:String,
                    required:true
                },
                gender:{
                    type:String,
                    required:true,
                    enum: ['male','female']
                }
            },
            cabdestination:{
                type:String,
                default:'null',
            }
        }
    ],
    cabsbooked:[
        {
            cabno:{
                type:String,
                required:true
            },
            cabtype:{
                type:String,
                required:true,
                enum: ['economy']
            },
            cabdriver:{
                name:{
                    type:String,
                    required:true
                },
                age:{
                    type:String,
                    required:true
                },
                gender:{
                    type:String,
                    required:true,
                    enum: ['male','female']
                }
            },
            cabdestination:{
                type:String,
                default:'null',
            }
        }
    ]
},{timestamps:true});


const Cabmodel = mongoose.model("cabservice",CabSchema);

export default Cabmodel;