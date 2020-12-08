import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  appDoneLoading,
  appLoading,
  setMessage,
  showMessageWithTimeout,
} from "../appState/actions";
import { selectPicturesIds, selectPictures } from "../picture/selectors";
import { removeAllPicture } from "../picture/actions";
import { selectToken } from "../user/selectors";

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
    const pictures = selectPictures(getState());
    const picturesIds = pictures ? selectPicturesIds(getState()) : [];
    console.log(`pictures ids`, picturesIds);
    try {
      const res = await axios.post(
        `${apiUrl}/post`,
        {
          title,
          content,
          picturesIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("what is res.data in create post", res.data);
      const post = res.data;
      dispatch(removeAllPicture());
      dispatch(storeNewPost(post));
      dispatch(
        showMessageWithTimeout("success", true, "Post Created Successfully")
      );
    } catch (e) {
      console.log("error", e);
    }
  };
}

const addNewComment = (newPosts) => {
  return { type: "ADD_NEW_COMMENT", payload: newPosts };
};

export const postNewComment = (content, postId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const posts = getState().post.all;
    console.log("POSTS IN ACTIONS", posts);

    try {
      const response = await axios.post(
        `${apiUrl}/comment`,
        {
          content,
          postId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newComment = response.data;

      const newPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      });

      dispatch(addNewComment(newPosts));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
