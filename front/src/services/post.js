import axios from "axios";
const baseUrl = "http://localhost:1234"

const newPostService = async (post,token)  => {
    const result = await axios.post(baseUrl + "/posts/new",{post},{headers:{"Authorization":`bearer ${token}`}})
    return result;
}
const getAllPostsService = async() =>{
    const result = await axios.get(baseUrl+"/posts/all")
    return result;
}

export {newPostService,getAllPostsService}