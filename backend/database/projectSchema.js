import { model, Schema } from "mongoose";

const projectSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    }
},{timestamps:true})


export const Project = model('Project', projectSchema)