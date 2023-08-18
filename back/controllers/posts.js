const getToken = require("../middleware/token");
const postsRouter = require("express").Router()
const Post = require("../models/post.js")


postsRouter.post("/new",getToken, async(req,res)=>{
    try {
        const author = req.user;
        const content = req.body.post;
        if(!author){
            return res.status(400).json("Missing user creator")
        }
        if(content.length < 5){
            return res.status(400).json("Post content must be at least 5 characters long")
        }
        if(content.length > 5000){
            return res.status(400).json("Post content max length is 5000 characters")
        }
        const post = new Post({content,author})
        await post.save()
        await author.posts.push(post)
        await author.save()
        return res.status(200).json("Post created")
      
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
})

postsRouter.get("/all",async(req,res)=>{
    const posts = await Post.find().sort({date:-1}).populate("author","username");
    return res.status(200).json(posts);
})

module.exports = postsRouter