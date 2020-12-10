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

export function updateAdmin(id) {
  return {
    type: "UPDATE_ADMIN",
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

export const adminUpdate = (id) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${apiUrl}/users/admin/${id}`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateAdmin(id));
    } catch (e) {
      console.log("error", e);
    }
  };
};
