import React from "react"
import NewPost from "./NewPost.js";
import "./css/Home.css";
import Navbar from './Navbar.js';
import AllPosts from "./AllPosts.js";

const Home = ({user,setUser})=>{
    return(
        <>
        <Navbar user={user} setUser={setUser}/>
        <div className="home-container">
            {user && <NewPost user={user}/>}
            <AllPosts/>
        </div>
        </>
    )
}

export default Home;