import React, { useState } from 'react'
import "./css/NewPost.css"
import { newPostService } from '../services/post'

const NewPost = ({user}) => {
  const [content,setContent] = useState("")
  const [error,setError] = useState("")
  const [msg,setMsg] = useState("")
  const [showNewPost,setShowNewPost] = useState("")
  const newPost = async (event) => {
    event.preventDefault();
    try {
        const result = await newPostService(content,user.token)
        setMsg("* "+result.data)
        setTimeout(()=>{
          setMsg("")
          setContent("")
          window.location.reload(false);
        },2000)

    } catch (error) {
      setError("* "+error.response.data)
      setTimeout(()=>{
        setError("")
      },3000)
    }
  }
  return (
    <div className="new-post-container">
      <button onClick={()=>setShowNewPost(!showNewPost)} className="new-post-btn">Create new post +</button>
      {showNewPost &&
      <form onSubmit={(event)=>newPost(event)} className="new-post-form">
          {error && <div className="post-error">
            {error}
            </div>}
            {msg && <div className="post-msg">
              {msg}
            </div>}
          <textarea placeholder="What do you want to post?" onChange={(e)=>setContent(e.target.value)} value={content}/>
          <button type="submit">Post</button>
      </form>
      }
    </div>

  )
}

export default NewPost