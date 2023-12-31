import React,{useState,useEffect} from 'react'
import { getAllCommentsService,commentPostService } from '../services/post'
import "./css/Comments.css"
import {useNavigate} from "react-router-dom"

const Comments = ({user,post}) => {
  const [comments,setComments] = useState(null)
  const [showComments,setShowComments] = useState(false)
  const [commentContent,setCommentContent] = useState("")
  const navigate = useNavigate()

  const getComments = async () => {
    try {
        const result = await getAllCommentsService(post._id);
        setComments(result.data.comments)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    getComments()
  },[])

  const newComment = async(e) => {
    try {
      if(!user) {
        alert("You must be logged in to comment")
        return
      } 
      e.preventDefault()
      const result = await commentPostService(user.token,post._id,commentContent)
      console.log(result) 
      window.location.reload(false)
    } catch (error) {
      console.log(error)
      if(error.response){
        alert(error.response.data)
      }
    }

  }

  return (
    <div className="comments-container">
      <p className="comments-total" onClick={()=>setShowComments(!showComments)}>{`+ Comments (${comments ? comments.length : 0})`}</p>
      {showComments && <div className="show-comments">
        {comments ? comments.map(comment=>
          <div className="comment">
              <p className="comment-author" onClick={()=>navigate(`/${comment.author[0].username}`)}>{comment.author[0].username}:</p>
              <p className="comment-content"> {comment.content}</p>
            </div>)
           : null}
        <form className="new-content" onSubmit={(e)=>newComment(e)}>
          <input type="text" placeholder="Comment..." value={commentContent} onChange={(e)=>setCommentContent(e.target.value)}></input>
          <button type="submit">Comment!</button>
        </form>
      </div>}
    </div>
  )
}

export default Comments