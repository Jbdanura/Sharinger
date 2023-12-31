require("dotenv").config({path:"./keys/env"})

const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")

usersRouter.post("/create",async(req,res)=>{
    try {
        const {username,password} = req.body
        if(!username || !password) {
            return res.status(400).json("fields incomplete")
        }
        if(username.length > 10 || username.length < 3){
            return res.status(400).json("username must be between 3 and 15 characters long")
        }
        if (!/^[a-zA-Z]+$/.test(username)){
            return res.status(400).json("username must be only letters")
        }
        if(password.length > 20 || password.length < 3){
            return res.status(400).json("password must be between 3 and 20 characters long")
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

usersRouter.post("/login",async(req,res)=>{
    try {
        if(!req.body.username || !req.body.password){
            return res.status(400).json("Missing field");
        }
        const username = req.body.username;
        const password = req.body.password;
        const user = await User.find({username});
        let token = {}
        if(!user || user.length === 0){
            return res.status(400).json("Invalid user/password");
        } else {
            const samePassword = await bcrypt.compare(password,user[0].passwordHash);
            if(!samePassword) return res.status(400).json("Invalid user/password");
            const userForToken = {username};
            token = jwt.sign(userForToken, process.env.SECRET,{expiresIn:"1800s"})
            return res.status(200).json({username,token});
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({error})
    }
})
usersRouter.get("/random",async(req,res)=>{
    try {
        const users = await User.find({}).limit(10)
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})
module.exports = usersRouter