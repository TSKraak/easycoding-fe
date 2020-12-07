import { apiUrl } from "../../config/constants";
import axios from "axios";

export function storePosts(posts) {
  return {
    type: "STORE_POSTS",
    payload: posts,
  };
}

export async function fetchPosts(dispatch, getState) {
  try {
    const res = await axios.get(`${apiUrl}/post`);
    console.log("what is res.data", res.data);
    const posts = res.data;
    dispatch(storePosts(posts));
  } catch (e) {
    console.log("error", e);
  }
}
