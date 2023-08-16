import React from "react"
import NewPost from "./NewPost.js";
import "./css/Home.css";
import Navbar from './Navbar.js';

const Home = ({user,setUser})=>{
    return(
        <>
        <Navbar user={user} setUser={setUser}/>
        <div className="home-container">
            {user && <NewPost user={user}/>}
        </div>
        </>
    )
}

export default Home;