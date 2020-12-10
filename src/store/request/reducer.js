const initialState = [];

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_REQUESTS":
      return action.payload;

    case "ADD_REQUEST":
      return [...state, action.payload];

    case "ADD_NEW_REQUEST_COMMENT":
      return action.payload;

    case "ADD_NEW_REQUEST_REPLY":
      return action.payload;

    case "UPDATE_REQUEST":
      const filteredState = state.filter((request) => {
        if (request.id === action.payload.id) {
          return false;
        } else {
          return true;
        }
      });
      return [...filteredState, action.payload];

    default:
      return state;
  }
};
