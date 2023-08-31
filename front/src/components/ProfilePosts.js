import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { getProfilePostsService } from '../services/post';
import Post from './Post';
import Navbar from './Navbar.js';
import NewPost from "./NewPost.js";
import "./css/ProfilePost.css"
import UserImage from "../icons/user.png"

export const ProfilePosts = ({user,setUser}) => {
  const [posts,setPosts] = useState("");
  const {username} = useParams();
  const [notFound,setNotFound] = useState(false)
  const getPosts = async () => {
    try {
        const result = await getProfilePostsService(username);
        setPosts(result.data)
        setNotFound(false)
    } catch (error) {
        if(error.response.status === 404) setNotFound(true)
    }
  }

  useEffect(()=>{
    setPosts("")
    getPosts()
  },[user,username])

  return (
    <>
        <Navbar user={user} setUser={setUser}/>
        <div className='profile-posts-container'>
          {!notFound && <div className="profile-post-header">
            <img className="profile-post-image" src={UserImage}/>
            <div className="profile-post-info">
              <div className="profile-post-info-top">
                <h4>{username}</h4>
                <div className="profile-post-info-followers">
                  <p>13 followers</p>
                  <p>11 following</p>
                </div>
              </div>
              <button className="profile-post-follow">Follow</button>
            </div>
          </div>}
          {notFound ? <h3>User not found</h3> : posts.length === 0 && <h3>No posts found</h3>}
          {username === user.username && <NewPost user={user}/>}
          <div className='profile-posts'>
              {posts && posts.map((post,i)=>
                  <Post post={post} user={user} key={i}/>
              )}
          </div>
        </div>
     </>
  )
}

export default ProfilePosts