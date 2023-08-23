import React,{useState,useEffect} from 'react'
import "./css/Post.css"
import { deletePostService,editPostService,likePostService } from '../services/post'

const Post = ({post,user}) => {

  const [username,setUsername] = useState("")
  const [editModal,setEditModal] = useState(false)
  const [modalValue, setModalValue] = useState(post.content)

  useEffect(()=>{
    try {
      setUsername(user.username)
    } catch (error) {
      console.log(error)
    }
  },[])

  const deletePost = async() => {
    try {
      const result = await deletePostService(user.token,post._id);
      window.location.reload(false);
      console.log(result)
    } catch (error) {
      alert(error.response.data);
    }
  }
  const editPost = async() => {
    try {
      const result = await editPostService(user.token,post._id,modalValue);
      window.location.reload(false);
      console.log(result)
    } catch (error) {
      alert(error.response.data);
    }
  }
  const likePost = async() => {
    try {
      const result = await likePostService(user.token,post._id);
      console.log(result)
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <div className="post">
        <div className="post-header">
            <p>{post.author[0].username}</p> 
            <div className="post-header-right">
            <p>{post.date.substring(0,10)} {post.date.substring(11,19)} </p>
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
        : <p className="post-content">{post.content}</p> }
        <div className="post-options">
          <p onClick={()=>likePost()}>Like</p>
          <p>Dislike</p>
        </div>
    </div>
  )
}

export default Post