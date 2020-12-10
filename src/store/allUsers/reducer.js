const initialState = [];

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_ALL_USERS":
      return action.payload;

    case "UPDATE_BLOCKED":
      return [
        ...state.map((user) => {
          if (user.id === parseInt(action.payload)) {
            return {
              ...user,
              accountBlocked: !user.accountBlocked,
            };
          }
          return user;
        }),
      ];

    case "UPDATE_ADMIN":
      return [
        ...state.map((user) => {
          if (user.id === parseInt(action.payload)) {
            return {
              ...user,
              isAdmin: !user.isAdmin,
            };
          }
          return user;
        }),
      ];

    default:
      return state;
  }
};
