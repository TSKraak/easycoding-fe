import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { selectPicturesIds } from "./selector";

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

export const postPicture = (value) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    try {
      const response = await axios.post(`${apiUrl}/picture`, value, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
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

export const assignPicture = (postId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const picturesIds = selectPicturesIds(getState());
    try {
      await axios.put(
        `${apiUrl}/picture/${postId}`,
        { id: picturesIds },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(removeAllPicture());
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
      console.log(`removed picture`, id);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};
