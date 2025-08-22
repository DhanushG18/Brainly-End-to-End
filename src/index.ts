import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ContentModel, sharableModel, UserModel } from "./db.js";
import {JWT_PASSWORD, MONGO_URL} from "./config.js";
import { userMiddleware } from "./middleware.js";
import bcrypt from "bcrypt";
import { random } from "./utils.js";
import type { Request , Response} from "express";
dotenv.config();

interface AuthRequest extends Request{
    userId?: string;
}
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
        
    })
} catch(e: any) {
    if (e.code === 11000) {
        return res.status(409).json({ msg: "User already exists" });
    }
    return res.status(500).json({ msg: "Something went wrong", error: e.message });
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

app.post("/api/v1/brain/:share", userMiddleware , async (req:AuthRequest,res:Response) =>{
    
    const share = req.body.share;
    if(share){
        const existinglink = await sharableModel.findOne({
            userId: req.userId
        });
        if(existinglink){
            res.json({
                hash: existinglink.hash
            })
            return;
        }

        const hash = random(10);
        await sharableModel.create({
            userId : req.userId,
            hash : hash
    })
    res.json({
        hash
    })
    
    } else {
        await sharableModel.deleteOne({
            userId : req.userId
        })
    }
    res.json({
        msg : "Removed link "
    })


})

app.get("/api/v1/brain/:shareLink",async (req,res) =>{
    const hash = req.params.shareLink;
    const link = await sharableModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            msg: "sry incorrect input "
        })
        return;
    }
    
    const content = await ContentModel.findOne({
         userId: link.userId
    })
         const user = await UserModel.findOne({
             _id: link.userId
        })
        if(!user){
            res.status(411).json({
                msg:" user not found"
            })
            return;
        }
        res.json({
            username : user.username,
            content: content
        })
});
app.listen(3000)