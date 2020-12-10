export const selectPictures = (state) => state.picture;
export const selectPicturesIds = (state) =>
  state.picture.map((pic) => {
    return pic.id;
  });
