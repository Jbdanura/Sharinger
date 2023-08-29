const express = require("express")
require('express-async-errors');
const { connect } = require("./util/db")
const app = express()
const usersRouter = require("./controllers/user")
const postsRouter = require("./controllers/posts")
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
app.use("/posts",postsRouter)

app.use((err, req, res, next) => {
    res.json(err)
    next(err);
});

connect()