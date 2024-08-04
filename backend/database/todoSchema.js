import  { model, Schema } from "mongoose";

 const todoSchema = new Schema({
    description:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    projectId:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Todo = model('Todo', todoSchema)