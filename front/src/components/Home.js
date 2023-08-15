import React from "react"
import Navbar from "./Navbar.js"

const Home = ({user})=>{
    return(
        <div className="home-container">
            <Navbar user={user}/>
        </div>
    )
}

export default Home;