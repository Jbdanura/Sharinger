import React from 'react'
import "./css/Post.css"

const Post = ({post}) => {

  return (
    <div className="post">
        <div className="post-header">
            <p>{post.author[0].username}</p> 
            <p>{post.date.substring(0,10)} {post.date.substring(11,19)}</p>
            </div>
        <p className="post-content">{post.content}</p>
    </div>
  )
}

export default Post