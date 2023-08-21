import React,{useState,useEffect} from 'react'
import { getAllPostsService } from '../services/post'
import Post from './Post'

const AllPosts = ({user}) => {
  const [posts,setPosts] = useState("")
  const getAllPosts = async () => {
    try {
        const result = await getAllPostsService()
        setPosts(result.data)
        console.log(posts)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    getAllPosts()
  },[])
  return (
    <div className="home-posts">
        {posts && posts.map(post=><Post post={post} user={user}/>)}
    </div>
  )
}

export default AllPosts