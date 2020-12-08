import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePicture } from "../../store/picture/actions";
import { selectPictures } from "../../store/picture/selectors";
import "./PreviewPicture.css";

export default function ImagePreview() {
  const dispatch = useDispatch();
  const pictures = useSelector(selectPictures);
  if (pictures.length === 0) {
    return <div>{null}</div>;
  }
  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(deletePicture(event.target.value));
  };
  return (
    <>
      <div className="imagePreview">
        {pictures.map((pic) => {
          console.log(pic.id);
          return (
            <div key={pic.id} className="img-wrap lock">
              <button className="close" onClick={handleRemove} value={pic.id}>
                &times;
              </button>
              <img
                src={pic.url}
                alt={pic.name}
                className="displayImagePreview"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
