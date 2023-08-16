import React from 'react'
import "./css/NewPost.css"

const NewPost = ({user}) => {

  const newPost = (event) => {
    event.preventDefault();

  }
  return (
    <form onSubmit={(event)=>newPost(event)} className="new-post-container">
        <textarea placeholder="Your post here"/>
        <button type="submit">Post</button>
    </form>
  )
}

export default NewPost