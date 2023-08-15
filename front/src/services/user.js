import axios from "axios";
const baseUrl = "http://localhost:1234"

const register = async (username,password) => {
    const result = await axios.post(baseUrl+"/users/create",{username,password})
    return result
}

const login = async (username,password) => {
    const result = await axios.post(baseUrl+"/users/login",{username,password})
    return result
}

export {register,login};