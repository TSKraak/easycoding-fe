import { apiUrl } from "../../config/constants";
import axios from "axios";
import { showMessageWithTimeout } from "../appState/actions";

export function storePosts(posts) {
  return {
    type: "STORE_POSTS",
    payload: posts,
  };
}

export function storeNewPost(post) {
  return {
    type: "ADD_POSTS",
    payload: post,
  };
}

export async function fetchPosts(dispatch, getState) {
  try {
    const res = await axios.get(`${apiUrl}/post`);
    console.log("what is res.data in fetch posts", res.data);
    const posts = res.data;
    dispatch(storePosts(posts));
  } catch (e) {
    console.log("error", e);
  }
}

export function createPost(title, content) {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiUrl}/post`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("what is res.data in create post", res.data);
      const post = res.data;
      dispatch(storeNewPost(post));
      dispatch(
        showMessageWithTimeout("success", true, "Post Created Successfully")
      );
    } catch (e) {
      console.log("error", e);
    }
  };
}
