import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import NewPost from "./NewPost.js";
import "./css/Home.css";
import Navbar from './Navbar.js';
import AllPosts from "./AllPosts.js";
import {getRandomUsersService} from "../services/user.js"
import UserIcon from "../icons/user.png"

const Home = ({user,setUser})=>{
    const navigate = useNavigate()
    const [users,setUsers] = useState([])

    const getRandomUsers = async () => {
        try {
            const result = await getRandomUsersService()
            setUsers(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        setUsers()
        getRandomUsers()
    },[])

    return(
        <>
        <Navbar user={user} setUser={setUser}/>
        <div className="home-container">
            <div className="home-left">
                {user && <div className="home-myprofile">
                    <h3>{user.username}</h3>
                    <button onClick={()=>navigate(`/${user.username}`)}>View profile</button>
                </div>}
            </div>
            <div className="home-mid">
                {user && <NewPost user={user}/>}
                <AllPosts user={user}/>
            </div>
            <div className="home-right">
                <div className="recommended-users">
                    <h3>Recommended users</h3>
                        {users && users.map(recommendedUser=>
                        <div className="recommended-user" onClick={()=>navigate(`/${recommendedUser.username}`)}>
                            <img className="recommended-userIcon" src={UserIcon}/>
                            <p>{recommendedUser.username}</p>
                        </div>)}
                </div>
            </div>

        </div>
        </>
    )
}

export default Home;