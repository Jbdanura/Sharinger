import React, { useState } from 'react'
import "./css/NewPost.css"
import { newPostService } from '../services/post'

const NewPost = ({user}) => {
  const [content,setContent] = useState("")

  const newPost = async (event) => {
    event.preventDefault();
    try {
      if(content.length > 0){
        const result = await newPostService(content,user)
        console.log("result",result)
      }
    } catch (error) {
      console.log("error",error)
    }
  }
  return (
    <form onSubmit={(event)=>newPost(event)} className="new-post-container">
        <textarea placeholder="Your post here" onChange={(e)=>setContent(e.target.value)} value={content}/>
        <button type="submit">Post</button>
    </form>
  )
}

export default NewPost