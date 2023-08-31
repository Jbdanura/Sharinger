import React,{useState,useEffect} from 'react'
import "./css/Post.css"
import { deletePostService,editPostService,likePostService } from '../services/post'
import {useNavigate} from 'react-router-dom'
import Comments from './Comments'
import UserImage from "../icons/user.png"

const Post = ({post,user}) => {

  const [username,setUsername] = useState("")
  const [editModal,setEditModal] = useState(false)
  const [modalValue, setModalValue] = useState(post.content)
  const [liked,setLiked] = useState(false)
  const [likes,setLikes] = useState(0)
  const [showLikesModal,setShowLikesModal] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    try {
      setUsername(user.username)
      if(post.likes.includes(user.username)) {
        setLiked(true)
        setLikes(post.likes.length)
      } else{
        setLiked(false)
      }
    } catch (error) {
      console.log(error)
    }
  },[])

  const deletePost = async() => {
    try {
      const result = await deletePostService(user.token,post._id);
      window.location.reload(false);
    } catch (error) {
      alert(error.response.data);
    }
  }
  const editPost = async() => {
    try {
      const result = await editPostService(user.token,post._id,modalValue);
      window.location.reload(false);
    } catch (error) {
      alert(error.response.data);
    }
  }
  const likePost = async() => {
    try {
      if(!user) {
        alert("You must be logged in to like")
        return
      } 
      const result = await likePostService(user.token,post._id);
      setLiked(!liked)
      if(liked === true){
        setLikes(likes-1)
      } else{
        setLikes(likes+1)
      }
    } catch (error) {
      console.log(error);
      if(error.response) alert(error.response.data)
    }
  }
  return (
    <div className="post">
        <div className="post-header">
            <div className="post-header-left">
              <img className="post-userIcon" src={UserImage}/>
              <p className="post-username" onClick={()=>navigate(`/${post.author[0].username}`)}>{post.author[0].username}</p> 
            </div>
            <div className="post-header-right">
            <p>{post.date.substring(0,10)} {post.date.substring(11,16)} </p>
            {username === post.author[0].username &&
             <div className="post-admin">
                <button className="delete-post-btn" onClick={()=>deletePost()}>Delete</button>
                <button className="edit-post-btn" onClick={()=>setEditModal(!editModal)}>Edit</button>
              </div>
            }
            </div>
        </div>
        {editModal ? <><textarea className="post-edit-input" value={modalValue} onChange={(e)=>setModalValue(e.target.value)}></textarea>
        <button className="post-edit-accept" onClick={()=>editPost()}>✔</button>
        <button className="post-edit-cancel" onClick={()=>setEditModal(!editModal)}>X</button></>
        : <div className="post-content">
          <p className="post-likes-count" onClick={()=>setShowLikesModal(true)}>{likes}</p>
         <p onClick={()=>likePost()} className={`${liked ? "post-liked" : "post-like"}`}>❤</p>
        <p className="post-content">{post.content}</p> </div>}
        {showLikesModal && 
        <div className={`${showLikesModal ? "post-likes-modal-active" : "post-likes-modal"}`}>
          <div className="post-likes-modal-content">
            <span class="close" onClick={()=>setShowLikesModal(false)}>&times;</span>
            <p>Liked by</p>
            <div className="all-likes">
              {post.likes.length > 0 && post.likes.map(like=><p className="all-like" onClick={()=>navigate(`/${like}`)}>❤ {like}</p>)}
            </div>
          </div>
        </div>}
        <Comments user={user} post={post}/>
    </div>
  )
}

export default Post