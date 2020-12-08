const initialState = [];

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_IMAGE":
      return [...state, { ...action.payload }];
    case "DISPLAY_IMAGE_FROM_FETCH":
      if (action.payload.length === 0) {
        return [...initialState];
      }
      return [...action.payload];
    case "REMOVE_IMAGE":
      return [
        ...state.filter((image) => {
          console.log();
          return image.id !== parseInt(action.payload);
        }),
      ];
    case "REMOVE_ALL_IMAGE":
      return initialState;
    default:
      return state;
  }
};

export default imagesReducer;
