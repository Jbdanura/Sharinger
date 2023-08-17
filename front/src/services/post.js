import axios from "axios";
const baseUrl = "http://localhost:1234"

const newPostService = async (post,token)  => {
    console.log("here",post,token)
    const result = await axios.post(baseUrl + "/posts/new",{post},{headers:{"Authorization":`bearer ${token}`}})
    return result;
}
export {newPostService}