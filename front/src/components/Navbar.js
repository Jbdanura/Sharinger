import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./css/Navbar.css"
import User from "../icons/user.png"
import Button from '@mui/material/Button';

const Navbar = ({user,setUser}) => {
  const navigate = useNavigate();
  const [userOptions,setUserOptions] = useState(false);

  return (
    <div className="navbar">
        <h3 className="logo" onClick={()=>navigate("/")}>Sharinger</h3>
        <form className="search-bar">
          <input placeholder="Search username"/>
          <button>Search</button>
        </form>
        {!user ? <div className="not-logged">
            <h3 onClick={()=>navigate("/register")}>Register</h3>
            <p>|</p>
            <h3 onClick={()=>navigate("/login")}>Log in</h3>
          </div> 
          : <div className="user-options">
              <img className="user-icon" src={User} onClick={()=>setUserOptions(!userOptions)}/>
              <div className={`${userOptions ? "show-user-options" : "hide-user-options"}`}>
                <p>My profile</p>
                <p onClick={()=>{setUser(null);alert("Logged out")}}>Logout</p>
              </div>
            </div>}
        
    </div>
  )
}

export default Navbar