const initialState = [];

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "STORE_REQUESTS":
      return action.payload;

    case "ADD_REQUEST":
      return [...state, action.payload];

    default:
      return state;
  }
};
