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
import { selectUser } from "../../store/user/selectors";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

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
              This form used MarkDown text formatting. Learn more{" "}
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
            <Button variant="primary" type="submit">
              Create Post
            </Button>
          </Form.Group>
        </Form>
      </Container>
      {content ? (
        <Jumbotron fluid>
          <Container>
            <div>
              <h3>{title}</h3>
              <p>
                <strong>
                  Written by {user.name} on{" "}
                  {moment(new Date()).format("ddd DD MMMM YYYY HH:mm")}{" "}
                  <img
                    src={user.picture}
                    style={{ width: "30px", borderRadius: "50px" }}
                    alt="user-name"
                  />
                </strong>
              </p>
              <div>
                <ReactMarkdown plugins={[gfm]} children={content} />
              </div>
            </div>
          </Container>
        </Jumbotron>
      ) : null}
    </div>
  );
}
