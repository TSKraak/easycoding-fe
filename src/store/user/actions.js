import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

const loginSuccess = (userWithToken) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: "TOKEN_STILL_VALID",
  payload: userWithoutToken,
});

const addFavourite = (favourite) => {
  return {
    type: "ADD_FAVOURITE",
    payload: favourite,
  };
};

export const logOut = () => ({ type: "LOG_OUT" });

export const signUp = (name, picture, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        picture,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "Account created"));
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

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      if (response.data.accountBlocked) {
        dispatch(setMessage("danger", true, "Your account has been blocked"));
        dispatch(logOut());
        return dispatch(appDoneLoading());
      }
      dispatch(loginSuccess(response.data));
      dispatch(fetchFavourite());
      dispatch(showMessageWithTimeout("success", false, "Welcome back!", 3000));
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

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (!token) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(fetchFavourite());
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const updateUser = (attribute) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      await axios.put(
        `${apiUrl}/users/profile`,
        {
          ...attribute,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch((attribute) => {
        return {
          type: "USER_UPDATE",
          payload: {
            attribute,
          },
        };
      });
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          `Profile ${Object.keys(attribute)[0]} updated`,
          3000
        )
      );
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

export const fetchFavourite = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(appLoading());
    try {
      const response = await axios.get(`${apiUrl}/favourite`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(addFavourite(response.data.favourite));
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
