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

  const getPosts = async () => {
    try {
        const result = await getProfilePostsService(username);
        setPosts(result.data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    getPosts()
  },[username])

  return (
    <>
        <Navbar user={user} setUser={setUser}/>
        <div className='profile-posts-container'>
          {posts.length === 0 && <h3>User not found</h3>}
          {username === user.username && <NewPost user={user}/>}
          <div className='profile-posts'>
              {posts && posts.map((post,i)=>
                  <Post post={post} key={i}/>
              )}
          </div>
        </div>
     </>
  )
}

export default ProfilePosts