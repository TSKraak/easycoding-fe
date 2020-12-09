import { apiUrl } from "../../config/constants";
import axios from "axios";

import { appDoneLoading, appLoading } from "../appState/actions";

export const storeRequests = (requests) => {
  return {
    type: "STORE_REQUESTS",
    payload: requests,
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
