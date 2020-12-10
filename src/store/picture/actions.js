import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";

export const displayPicture = (picture) => {
  return { type: "DISPLAY_PICTURE", payload: picture };
};

export const displayPictureFromFetch = (pictures) => {
  return { type: "DISPLAY_PICTURE_FROM_FETCH", payload: pictures };
};

export const removePicture = (id) => {
  return { type: "REMOVE_PICTURE", payload: id };
};

export const removeAllPicture = () => {
  return { type: "REMOVE_ALL_PICTURE" };
};

export const fetchPicture = (postId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.get(`${apiUrl}/picture/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(displayPictureFromFetch(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const postPicture = (value) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.post(`${apiUrl}/picture`, value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(displayPicture(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export const deletePicture = (id) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      await axios.delete(`${apiUrl}/picture/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removePicture(id));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
