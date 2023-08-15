require("dotenv").config({path:"./keys/.env"})
const mongoose = require("mongoose");

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected")
    } catch (error) {
        console.log("failed to connect:",error)
    }
}

module.exports = {connect}