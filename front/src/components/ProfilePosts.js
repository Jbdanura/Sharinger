import React, { useEffect,useState } from 'react'
import { useParams } from "react-router-dom";
import { getProfilePostsService } from '../services/post';
import Post from './Post';
import Navbar from './Navbar.js';

export const ProfilePosts = ({user,setUser}) => {
  const [posts,setPosts] = useState("");
  const {username} = useParams();

  const getPosts = async () => {
    try {
        const result = await getProfilePostsService(username);
        setPosts(result.data);     
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    getPosts()
  },[])

  return (
    <>
        <Navbar user={user} setUser={setUser}/>
        <div className='profile-posts'>
            {posts && posts.map((post,i)=>
                <Post post={post} key={i}/>
            )}
        </div>
     </>
  )
}

export default ProfilePosts