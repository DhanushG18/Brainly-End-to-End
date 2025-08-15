import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db.js";
import {JWT_PASSWORD} from "./config.js";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
const app= express();
app.use(express.json());

app.post("/api/v1/signup" , async(req,res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
        username,
        password:hashedPassword
    })
    res.json({
        msg: "User signed up"
        //status codes
    })
}catch(e){
    res.status(411).json({
        msg: " User already exists"
        
    })
} 

})

app.post("/api/v1/signin" , async (req,res) =>{
    const username  = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username
    });

    if(existingUser && typeof existingUser.password === "string" && await bcrypt.compare(password, existingUser.password)){
        const token = jwt.sign({
            id:existingUser._id
        },JWT_PASSWORD || "default-secret"
);

        res.json({
            token
        })
    }else{
        res.status(403).json({
            msg:"incorrect credentials"
        })
    }

})

app.post("/api/v1/content", userMiddleware,async (req,res) =>{
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags:[]
    })
    return res.json({
        msg:"Content added"
    })

})

app.get("/api/v1/content",userMiddleware, async (req,res) =>{
   // @ts-ignore
   const userId = req.userId;
   const content = await ContentModel.find({
    userId:userId
   }).populate("userId","username")
   res.json({
    content
   })
})

app.delete("/api/v1/content",userMiddleware, async(req,res) =>{
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId :req.userId

    })
    res.json({
        msg:"deleted"
    })

})

app.post("/api/v1/brain/share", (req,res) =>{

})

app.get("/api/v1/brain/:shareLink", (req,res) =>{
    
})
app.listen(3000);