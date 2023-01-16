const express = require("express")
const userRoute = express.Router()
const {UserModel} = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

userRoute.get("/",async(req,res)=>{
    try {
        let q = req.query
        let user = await UserModel.find(q)
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

userRoute.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body
    try {
        bcrypt.hash(password, 5, async (err, secured_pass)=>{
if(err){
    res.send(err)
}else{
    const user = new UserModel({
        name,
        email,
        gender,
        password:secured_pass
    })
    await user.save()
    res.send("User registered!!")
}
        });
    } catch (error) {
       console.log(error) 
    }
})


userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        
        const user = await UserModel.find({email:email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password, (err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id}, process.env.key);
                    res.send({"msg":"login successfull",token:token}) 
                }else{
                        res.send({"msg":"wrong credentials! if not registered? Register again"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = {userRoute}