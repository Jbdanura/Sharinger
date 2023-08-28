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
            <div className="home-left">
                left
            </div>
            <div className="home-mid">
                {user && <NewPost user={user}/>}
                <AllPosts user={user}/>
            </div>
            <div className="home-right">
                right
            </div>

        </div>
        </>
    )
}

export default Home;