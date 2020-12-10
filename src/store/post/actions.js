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

export function storeUpdatedPost(post, postId) {
  return {
    type: "UPDATE_POSTS",
    payload: { post, postId },
  };
}

export function removePost(postId) {
  return {
    type: "REMOVE_POSTS",
    payload: postId,
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

export function updatePost(title, content, postId) {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    const pictures = selectPictures(getState());
    const picturesIds = pictures ? selectPicturesIds(getState()) : [];

    try {
      const res = await axios.put(
        `${apiUrl}/post/${postId}`,
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
      dispatch(storeUpdatedPost(post, postId));
      dispatch(
        showMessageWithTimeout("success", true, "Post Updated Successfully")
      );
    } catch (e) {
      console.log("error", e);
    }
  };
}

export function deletePost(postId) {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${apiUrl}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeAllPicture());
      dispatch(removePost(postId));
      dispatch(showMessageWithTimeout("secondary", true, "Post Deleted"));
    } catch (e) {
      console.log("error", e);
    }
  };
}

export function deletePostAsAdmin(postId) {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${apiUrl}/post/admin/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeAllPicture());
      dispatch(removePost(parseInt(postId)));
      dispatch(showMessageWithTimeout("secondary", true, "Post Deleted"));
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

const addEditPostComment = (updatedPosts) => {
  return { type: "ADD_NEW_POST_COMMENT", payload: updatedPosts };
};

export const editPostComment = (content, commentId, postId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const posts = getState().post.all;

    try {
      const response = await axios.put(
        `${apiUrl}/comment/${commentId}`,
        {
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedComment = response.data;

      const updatedPosts = posts.map((post) => {
        if (post.id === parseInt(postId)) {
          return {
            ...post,
            comments: [
              ...post.comments.filter(
                (comment) => comment.id !== parseInt(commentId)
              ),
              updatedComment,
            ],
          };
        }
        return post;
      });

      dispatch(addEditPostComment(updatedPosts));
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

const addEditPostReply = (updatedPosts) => {
  return { type: "ADD_NEW_POST_REPLY", payload: updatedPosts };
};

export const editPostReply = (content, answerId, postId, commentId) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    const posts = getState().post.all;

    try {
      const response = await axios.put(
        `${apiUrl}/answer/${answerId}`,
        {
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const editReply = response.data;

      const updatedPosts = posts.map((post) => {
        if (post.id === parseInt(postId)) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                answers: [
                  ...comment.answers.filter(
                    (answer) => answer.id !== parseInt(answerId)
                  ),
                  editReply,
                ],
              };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      });

      dispatch(addEditPostReply(updatedPosts));
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
