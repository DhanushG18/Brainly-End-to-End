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
    type: String,
    tags: [{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type:mongoose.Types.ObjectId, ref:'User', required:true}
})

export const ContentModel = model("Content", contentSchema)

const sharableSchema = new Schema ({
     userId: {type:mongoose.Types.ObjectId, ref:'User', required:true, unique :true },
     hash : String
})

export const sharableModel = model("sharable", sharableSchema)