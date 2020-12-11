import React, { useState } from "react";
import moment from "moment";
import { Button, Container, Form, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ImagePreview from "../../components/PreviewPicture";
import UploadPostPicture from "../../components/UploadPostPicture";
import { createPost } from "../../store/post/actions";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectPictures } from "../../store/picture/selectors";
import DisplayPicture from "../../components/DisplayPicture";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const pictures = useSelector(selectPictures);
  const token = useSelector(selectToken);
  if (!token) {
    history.push("/login");
  }

  async function submitForm(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

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
            <Form.Label>Post content</Form.Label>
            <Form.Text className="text-muted">
              This form uses MarkDown text formatting. Learn more{" "}
              <a href="https://commonmark.org/help/">here!</a>
            </Form.Text>
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="text"
              as="textarea"
              rows={13}
              placeholder="Enter content"
              required
            />
            <Form.Text className="text-muted">
              Scroll down to see a preview of your post.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a text.
            </Form.Control.Feedback>
          </Form.Group>
          <ImagePreview />
          <UploadPostPicture />
          <Form.Group className="mt-5">
            <Button variant="success" type="submit">
              Create Post
            </Button>
          </Form.Group>
        </Form>
      </Container>
      {content || pictures.length !== 0 ? (
        <Jumbotron fluid>
          <Container>
            <div>
              <div
                style={{ borderBottom: "solid 1px grey", marginBottom: "1rem" }}
              >
                <h1>{title}</h1>
                <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                  <img
                    src={user.picture}
                    style={{ width: "30px", borderRadius: "50px" }}
                    alt="author-name"
                  />{" "}
                  Written by {user.name} on{" "}
                  {moment(new Date()).format("ddd DD MMMM YYYY HH:mm")}
                </p>
              </div>
              <div>
                <ReactMarkdown plugins={[gfm]} children={content} />
              </div>
              {pictures.length !== 0 ? (
                <DisplayPicture pictures={pictures} />
              ) : null}
            </div>
          </Container>
        </Jumbotron>
      ) : null}
    </div>
  );
}
