const cors = require("cors")
const express = require("express")
const {connection} = require("./config/db")
const {userRoute} = require("./routes/userroute")
const { mediaRoute } = require("./routes/mediaroute")
const { authenticator } = require("./middlewares/authenticator")
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json())


app.use("/user",userRoute)
app.use(authenticator)
app.use("/post",mediaRoute)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log(`running at port ${process.env.port}`)
    } catch (error) {
        console.log(error)
    }
})