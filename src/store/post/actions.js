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

const addNewPostComment = (newPosts) => {
  return { type: "ADD_NEW_POST_COMMENT", payload: newPosts };
};

export const postNewPostComment = (content, postId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const posts = getState().post.all;

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

      dispatch(addNewPostComment(newPosts));
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

const addNewPostReply = (newPosts) => {
  return { type: "ADD_NEW_POST_REPLY", payload: newPosts };
};

export const postNewPostReply = (content, postId, commentId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const posts = getState().post.all;

    try {
      const response = await axios.post(
        `${apiUrl}/answer`,
        {
          content,
          commentId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newReply = response.data;

      const newPosts = posts.map((post) => {
        if (post.id === postId) {
          const newComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, answers: [...comment.answers, newReply] };
            }
            return comment;
          });
          return { ...post, comments: newComments };
        }
        return post;
      });

      dispatch(addNewPostReply(newPosts));
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
