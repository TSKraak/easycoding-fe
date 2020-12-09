const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  picture: null,
  isAdmin: null,
  accountBlocked: null,
  createdAt: null,
  updatedAt: null,
  favourite: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case "TOKEN_STILL_VALID":
      return { ...state, ...action.payload };

    case "USER_UPDATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
