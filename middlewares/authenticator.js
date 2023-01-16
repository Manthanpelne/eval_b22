const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticator = async (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,process.env.key)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.status(400).send({"msg":"please login first"})
        }
    }
    else{
        res.status(400).send({"msg":"please login first"})
    }
}

module.exports = {authenticator}