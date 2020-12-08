export const selectImages = (state) => state.images;
export const selectPicturesIds = (state) =>
  state.images.map((image) => {
    return image.id;
  });
