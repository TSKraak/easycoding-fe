import React from "react";
import { Button } from "react-bootstrap";

export default function UploadUserImage(props) {
  const handleOpen = async () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "doai9yryh",
        uploadPreset: "dgfhe4a6",
      },
      (error, result) => {
        if (result.event === "success") {
          props.setPicture(result.info.url);
        }
      }
    );
    widget.open();
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="outline-dark">
        Upload Image
      </Button>
    </div>
  );
}
