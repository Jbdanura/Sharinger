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
const getRandomUsersService = async () => {
    const result = await axios.get(baseUrl + "/users/random")
    return result
}
const followUserService = async (token,username) => {
    const result = await axios.post(baseUrl+`/users/follow`,{username},{headers:{"Authorization":`bearer ${token}`}})
    return result
}
export {register,login,getRandomUsersService,followUserService};