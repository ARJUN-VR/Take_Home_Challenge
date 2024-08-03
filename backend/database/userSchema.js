import { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    access_token:{
        type:String,
        required:true
    }
},{timestamps:true})

export const User = model('User',userSchema)