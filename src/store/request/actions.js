import { apiUrl } from "../../config/constants";
import axios from "axios";

import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const storeRequests = (requests) => {
  return {
    type: "STORE_REQUESTS",
    payload: requests,
  };
};

export const storeNewRequest = (request) => {
  return {
    type: "ADD_REQUEST",
    payload: request,
  };
};

export const fetchRequests = async (dispatch, getState) => {
  dispatch(appLoading());
  try {
    const response = await axios.get(`${apiUrl}/request`);
    dispatch(storeRequests(response.data));
    dispatch(appDoneLoading());
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    } else {
      console.log(error.message);
    }
    dispatch(appDoneLoading());
  }
};

export const addRequest = (title, content) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiUrl}/`,
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
      console.log("what is res in add request", res);
      // dispatch(storeNewRequest())
      dispatch(
        showMessageWithTimeout("success", true, "Request Created Successfully")
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
      dispatch(appDoneLoading());
    }
  };
};
