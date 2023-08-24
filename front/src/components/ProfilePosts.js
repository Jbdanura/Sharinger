import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { getProfilePostsService } from '../services/post';
import Post from './Post';
import Navbar from './Navbar.js';
import NewPost from "./NewPost.js";
import "./css/ProfilePost.css"

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
    getPosts()
  },[user,username])

  return (
    <>
        <Navbar user={user} setUser={setUser}/>
        <div className='profile-posts-container'>
          {!notFound && <h3>{username}</h3>}
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