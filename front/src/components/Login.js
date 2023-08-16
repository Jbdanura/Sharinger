import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {login} from "../services/user";
import "./css/LoginRegister.css";

const Login = ({setUser}) => {
    const navigate = useNavigate();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [successMessage,setSuccessMessage] = useState(null);
    const [errorMessage,setErrorMessage] = useState(null);

    const loginUser = async (event) =>{
        try {
            event.preventDefault()
            const result = await login(username,password);
            setUser(result.data);
            setSuccessMessage("* Logged in!");
            setTimeout(()=>{
                setSuccessMessage(null);
                if(result){
                    navigate("/");
                }
            },1000)
        } catch (error) {
            const errorMsg = error.response.data;
            setErrorMessage(`* ${errorMsg}`)
            setTimeout(()=>{
              setErrorMessage(null);
            },3000)
        }
    }

    return (
    <div className="loginRegister-body">
        <form onSubmit={(event)=>loginUser(event)} className="loginRegister-container">
            <h2 className="loginRegister-logo">Sharinger</h2>
            {successMessage && 
            <div className="success-message">
                {successMessage}
            </div>
            }
            {errorMessage && 
            <div className="error-message">
                {errorMessage}
            </div>
            }
            <label for="username">Username</label>
            <input placeholder="Username..." name="username" value={username} onChange={(event)=>setUsername(event.target.value)}></input>
            <label for="password">Password</label>
            <input type="password" placeholder="*****" name="password" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
            <button type="submit" className="loginRegister-button">Log in</button>
            <a className="go-back" href="" onClick={()=>navigate("/")}>Go back</a>
        </form>
    </div>
  )
}

export default Login