import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage } from "../../store/images/action";
import { selectImages } from "../../store/images/selector";
import "./ImagePreview.css";

export default function ImagePreview() {
  const dispatch = useDispatch();
  const images = useSelector(selectImages);
  if (images.find((image) => image.id === 0)) {
    return <div>{null}</div>;
  }
  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(deleteImage(event.target.value));
  };
  return (
    <>
      <div className="imagePreview">
        {images.map((image) => {
          console.log(image.id);
          return (
            <div key={image.id} className="img-wrap lock">
              <button className="close" onClick={handleRemove} value={image.id}>
                &times;
              </button>
              <img
                src={image.url}
                alt={image.name}
                className="displayImagePreview"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
