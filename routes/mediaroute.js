const express = require("express")
const {MediaModel} = require("../models/mediamodel")
const jwt = require("jsonwebtoken")
const mediaRoute = express.Router()

mediaRoute.get("/",async(req,res)=>{
    const q = req.query
    try {
        const media = await MediaModel.find(q)
        res.send(media)
        console.log("here is your data")

    } catch (error) {
        console.log(error)
    }
})

mediaRoute.post("/create",async(req,res)=>{
    const payload = req.body
    try {
        const media = new MediaModel(payload)
        await media.save()
        res.send(media)
        console.log("created new post")
    } catch (error) {
        console.log(error)
    }
})


mediaRoute.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body
    const post = await MediaModel.findOne({_id:id})
    const postUserID = post.userID
    const userid_MakingReq = req.body.userID

    try {
    if(userid_MakingReq!=postUserID){
        res.send({"msg":"You are not authorized"})
    } else{
        const post = await MediaModel.findByIdAndUpdate({_id:id},payload)
      res.send(post)
      console.log("updated the post")
    }
    } catch (error) {
        res.send({"err":"somthing is wrong"})
    }
})



mediaRoute.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    try {
        const media = await MediaModel.findByIdAndDelete({_id:id})
        res.send({"msg":"deleted the post"})
    } catch (error) {
        console.log(error)
    }
})


module.exports = {mediaRoute}