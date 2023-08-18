import React, { useState } from 'react'
import "./css/NewPost.css"
import { newPostService } from '../services/post'

const NewPost = ({user}) => {
  const [content,setContent] = useState("")
  const [error,setError] = useState("")
  const [msg,setMsg] = useState("")
  const newPost = async (event) => {
    event.preventDefault();
    try {
        const result = await newPostService(content,user)
        setMsg("* "+result.data)
        setTimeout(()=>{
          setMsg("")
        },3000)
        setContent("")
        window.location.reload(false);
    } catch (error) {
      setError("* "+error.response.data)
      setTimeout(()=>{
        setError("")
      },3000)
    }
  }
  return (
    <form onSubmit={(event)=>newPost(event)} className="new-post-container">
        {error && <div className="post-error">
          {error}
          </div>}
          {msg && <div className="post-msg">
            {msg}
          </div>}
        <textarea placeholder="What do you want to post?" onChange={(e)=>setContent(e.target.value)} value={content}/>
        <button type="submit">Post</button>
    </form>
  )
}

export default NewPost