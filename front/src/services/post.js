import axios from "axios";
const baseUrl = "http://localhost:1234"

const newPost = async (post)  => {
    const result = await axios.post("/posts/new",post)
}
export {newPost}