const initialState = {
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POSTS":
      return { ...state, all: [...state.all, ...action.payload] };

    default:
      return state;
  }
};
