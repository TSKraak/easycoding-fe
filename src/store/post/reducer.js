const initialState = {
  all: [],
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POSTS":
      return { ...state, all: [...state.all, action.payload] };

    case "UPDATE_POSTS":
      return {
        ...state,
        all: [
          ...state.all.filter((post) => {
            return post.id !== parseInt(action.payload.postId);
          }),
          action.payload.post,
        ],
      };

    case "STORE_POSTS":
      return { ...state, all: action.payload };

    case "ADD_NEW_POST_COMMENT":
      return { ...state, all: action.payload };

    case "ADD_NEW_POST_REPLY":
      return { ...state, all: action.payload };

    default:
      return state;
  }
};
