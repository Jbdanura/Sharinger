const getToken = require("../middleware/token");
const postsRouter = require("express").Router()
const Post = require("../models/post.js")
const User = require("../models/user.js")
const Comment = require("../models/comment.js")

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
        return res.status(400).json(error);
    }
})

postsRouter.get("/all",async(req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1}).populate("author","username").populate("comments");
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error)
    }

})

postsRouter.get("/:username",async(req,res)=>{
    try {
        const user = await User.find({username:req.params.username})
        if(user.length === 0){
            return res.status(404).send("user not found")
        }
        const posts = await Post.find({author:user}).populate("author","username")
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})
postsRouter.delete("/:id",getToken,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate("author","username");
        if(post.author[0].username === req.user.username){
            await post.deleteOne();
            return res.status(200).json("Deleted post")
        } else {
            return res.status(400).json("You have no permission to delete that post")
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})
postsRouter.patch("/:id",getToken,async(req,res)=>{
    try {
        const newContent = req.body.newContent;
        const post = await Post.findById(req.params.id).populate("author","username");
        if(post.author[0].username === req.user.username){
            post.content = newContent;
            await post.save();
            return res.status(200).json("Edited post")
        } else {
            return res.status(400).json("You have no permission to edit that post")
        }
    } catch (error) {
        return res.status(400).json({error})
    }
})
postsRouter.post("/like/:id",getToken,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate("likes")
        if(post.likes.includes(req.user.username)){
            const newLikes = post.likes.filter(username => username !== req.user.username)
            post.likes = newLikes
            await post.save()
            return res.status(200).json("removed follow")
        } else {
            post.likes.push(req.user.username)
            await post.save()
            return res.status(200).json("following")
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
})
postsRouter.post("/comments/:id",getToken,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const content = req.body.comment
        if(content.length === 0){
            return res.status(400).send("Missing comment content")
        }
        const comment = new Comment({content,author:req.user,post})
        await comment.save()
        post.comments.push(comment)
        await post.save()
        return res.status(200).send("Created comment")
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
})
postsRouter.get("/comments/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate({
            path: "comments",
            populate: { path: "author", select: "username" } // Populate comments' author with only username
          })
        return res.status(200).json(post)
    } catch (error) {
        console.log(error);
        return res.status(400).json({error});
    }
})
module.exports = postsRouter