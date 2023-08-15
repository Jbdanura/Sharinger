import React from 'react'
import {useNavigate} from 'react-router-dom'

const Navbar = ({user}) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
        <h3 className="logo">Sharinger</h3>
        <form className="search-bar">
          <input placeholder="Search username or group..."/>
          <button>Search</button>
        </form>
        {!user ? <div className="not-logged">
            <h3 onClick={()=>navigate("/register")}>Register</h3>
            <p>|</p>
            <h3 onClick={()=>navigate("/login")}>Log in</h3>
          </div> 
          : <h3 className="user">User</h3>}
        
    </div>
  )
}

export default Navbar