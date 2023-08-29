import React, { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'
import NewPost from "./NewPost.js";
import "./css/Home.css";
import Navbar from './Navbar.js';
import AllPosts from "./AllPosts.js";
import {getRandomUsersService} from "../services/user.js"

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
                <div className="recommended-user">
                    <h3>Recommended users</h3>
                    <ul>
                        {users && users.map(recommendedUser=>
                        <li onClick={()=>navigate(`/${recommendedUser.username}`)}>{recommendedUser.username}</li>)}
                    </ul>
                </div>
            </div>

        </div>
        </>
    )
}

export default Home;