import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postPicture } from "../../store/picture/actions";

export default function UploadPostPicture() {
  const dispatch = useDispatch();
  const handleOpen = async () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "doai9yryh",
        uploadPreset: "dgfhe4a6",
      },
      (error, result) => {
        if (result.event === "success") {
          dispatch(
            postPicture({
              url: result.info.url,
              name: result.info.original_filename,
            })
          );
        }
      }
    );
    widget.open();
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="outline-dark">
        Upload Picture
      </Button>
    </div>
  );
}
