const getToken = require("../middleware/token");
const postsRouter = require("express").Router()
const Post = require("../models/post.js")


postsRouter.post("/new",getToken, async(req,res)=>{
    try {
        const author = req.user;
        const content = req.body.post;
        const post = new Post({content,author})
        await post.save()
        await author.posts.push(post)
        await author.save()
        return res.status(200).json("Created post")
      
    } catch (error) {
        console.log(error)
        return res.status(400).json({error});
    }
})

postsRouter.get("/all",async(req,res)=>{
    const posts = await Post.find().populate("author");
    return res.status(200).json(posts);
})

module.exports = postsRouter