import axios from "axios";
import { apiUrl } from "../../config/constants";

export function storeAllUsers(users) {
  return {
    type: "STORE_ALL_USERS",
    payload: users,
  };
}

export function updateBlockedUser(id) {
  return {
    type: "UPDATE_BLOCKED",
    payload: id,
  };
}

export const getAllUsers = () => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${apiUrl}/users`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("what is res in get all users", res);
      const users = res.data.users;
      dispatch(storeAllUsers(users));
    } catch (e) {
      console.log("error", e);
    }
  };
};

export const blockUser = (id) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${apiUrl}/users/block/${id}`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateBlockedUser(id));
    } catch (e) {
      console.log("error", e);
    }
  };
};
