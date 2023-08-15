require("dotenv").config({path:"./keys/env"})

const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const getToken = require("../util/token")

usersRouter.post("/create",async(req,res)=>{
    try {
        console.log("call")
        const {username,password} = req.body
        if(!username || !password) {
            return res.status(400).json("fields incomplete")
        }
        const existsUser = await User.findOne({username})
        if(existsUser){
            return res.status(400).json("username already exists")
        }
        const passwordHash = await bcrypt.hash(password,10)
        const user = await User.create({username,passwordHash})
        return res.status(200).send(user.username)
    } catch (error) {
        console.log(error)
        return res.status(404).json("failed request")
    }
})

usersRouter.get("/all",async(req,res)=>{
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})
usersRouter.post("/login",async(req,res)=>{
    try {
        if(!req.body.username || !req.body.password){
            return res.status(400).json("Missing field");
        }
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.find({username});
        console.log(username,password,user)
        let token = {}
        if(!user){
            return res.status(400).json("Invalid user/password");
        } else {
            const samePassword = await bcrypt.compare(password,user[0].passwordHash);
            if(!samePassword) return res.status(400).json("Invalid user/password");
            const userForToken = {username};
            token = jwt.sign(userForToken, process.env.SECRET)
        }
        return res.status(200).json(token);
    } catch (error) {
        console.log(error)
    }
})
module.exports = usersRouter