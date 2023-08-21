import axios from "axios";
const baseUrl = "http://localhost:1234"

const newPostService = async (post,token)  => {
    const result = await axios.post(baseUrl + "/posts/new",{post},{headers:{"Authorization":`bearer ${token}`}})
    return result;
}
const getAllPostsService = async() =>{
    const result = await axios.get(baseUrl + "/posts/all")
    return result;
}
const getProfilePostsService = async(username) => {
    const result = await axios.get(baseUrl + `/posts/${username}`);
    return result;
}
const deletePostService = async(token,id) => {
    const result = await axios.delete(baseUrl + `/posts/${id}`,{headers:{"Authorization":`bearer ${token}`}});
    return result;
}
const editPostService = async(token,id,newContent) => {
    const result = await axios.patch(baseUrl + `/posts/${id}`,{newContent},{headers:{"Authorization":`bearer ${token}`}});
    return result;
}
export {newPostService,getAllPostsService,getProfilePostsService,deletePostService,editPostService}