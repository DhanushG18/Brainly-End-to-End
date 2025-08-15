import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const UserSchema = new Schema({
    username : {type:String , unique:true},
    password : String
})

export const UserModel = model("User",UserSchema);

const contentSchema = new Schema({
    title:String,
    link : String,
    tags: [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type:mongoose.Types.ObjectId, ref:'User', required:true}
})

export const ContentModel = model("Content", contentSchema)