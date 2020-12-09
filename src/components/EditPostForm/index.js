import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ImagePreview from "../../components/PreviewPicture";
import UploadPostPicture from "../../components/UploadPostPicture";
import { createPost } from "../../store/post/actions";
import ImagePreviewEdit from "../PreviewPictureEdit";

export default function EditPostForm(props) {
  const [title, setTitle] = useState(props.post.title || "");
  const [content, setContent] = useState(props.post.content || "");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  async function submitForm(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    event.preventDefault();

    if (title !== "" && content !== "") {
      await dispatch(createPost(title, content));
      setTitle("");
      setContent("");
      history.push("/posts");
    }
  }
  return (
    <div>
      <h1>Create Post</h1>
      <Container>
        <Form
          md={{ span: 6, offset: 3 }}
          noValidate
          validated={validated}
          onSubmit={submitForm}
        >
          <Form.Group controlId="formPostTitle">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="title"
              placeholder="Enter title"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a title.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPostText">
            <Form.Label>Post Text</Form.Label>
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="text"
              as="textarea"
              rows={13}
              placeholder="Enter content"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a text.
            </Form.Control.Feedback>
          </Form.Group>
          <ImagePreviewEdit postId={props.post.id} />
          <UploadPostPicture />
          <Form.Group className="mt-5">
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
