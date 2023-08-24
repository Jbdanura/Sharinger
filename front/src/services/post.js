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
const likePostService = async(token,id)=>{
    const result = await axios.post(baseUrl + `/posts/like/${id}`,{},{headers:{"Authorization":`bearer ${token}`}});
    return result;
}
const commentPostService = async(token,id,comment)=>{
    const result = await axios.post(baseUrl + `/posts/comments/${id}`,{comment},{headers:{"Authorization":`bearer ${token}`}});
    return result;
}
const getAllCommentsService = async(id)=>{
    const result = await axios.get(baseUrl + `/posts/comments/${id}`);
    return result;
}
export {newPostService,getAllPostsService,getProfilePostsService,deletePostService,
    editPostService,likePostService,commentPostService,getAllCommentsService}