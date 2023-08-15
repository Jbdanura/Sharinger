const express = require("express")
const { connect } = require("./util/db")
const app = express()
const usersRouter = require("./controllers/user")
const cors = require('cors');

app.use(express.json())

app.use(cors());

app.listen(1234, ()=>{
    console.log("running app")
})

app.get("/",(req,res)=>{
    res.send("start")
})
app.use("/users",usersRouter)

connect()