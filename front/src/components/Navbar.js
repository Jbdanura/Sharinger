import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import "./css/Navbar.css"
import User from "../icons/user.png"

const Navbar = ({user,setUser}) => {
  const navigate = useNavigate();
  const [userOptions,setUserOptions] = useState(false);
  const [search,setSearch] = useState("")

  const searchUsername = (e) => {
    e.preventDefault()
    navigate(`/${search}`)
  }

  return (
    <div className="navbar">
        <h3 className="logo" onClick={()=>navigate("/")}>Sharinger</h3>
        <form className="search-bar" onSubmit={(e)=>searchUsername(e)}>
          <input placeholder="Search user..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
        {!user ? <div className="not-logged">
            <h3 onClick={()=>navigate("/register")}>Register</h3>
            <p>|</p>
            <h3 onClick={()=>navigate("/login")}>Log in</h3>
          </div> 
          : <div className="user-options">
              <img className="user-icon" src={User} onClick={()=>setUserOptions(!userOptions)}/>
              <div className={`${userOptions ? "show-user-options" : "hide-user-options"}`}>
                <p onClick={()=>navigate(`/${user.username}`)}>My profile</p>
                <p onClick={()=>{setUser(null);localStorage.removeItem("user");alert("Logged out");window.location.reload(false);}}>Logout</p>
              </div>
            </div>}
        
    </div>
  )
}

export default Navbar