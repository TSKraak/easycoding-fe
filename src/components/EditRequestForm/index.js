import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteRequest,
  deleteRequestAdmin,
  updateRequest,
} from "../../store/request/actions";
import { selectUser } from "../../store/user/selectors";

export default function EditRequestForm({ req }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [title, setTitle] = useState(req.title);
  const [content, setContent] = useState(req.content);
  const [validated, setValidated] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [editButton, setEditButton] = useState(false);

  async function submitUpdateRequestForm(event) {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
    event.preventDefault();

    if (title !== "" && content !== "") {
      await dispatch(updateRequest(requestId, title, content));
      setTitle("");
      setContent("");
      setRequestId("");
      setEditButton(false);
      history.push("/requests");
    }
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        onClick={() => {
          setEditButton(editButton === true ? false : true);
        }}
        style={{
          fontSize: "0.7rem",
        }}
      >
        Edit
      </Button>{" "}
      {user.isAdmin ? (
        <Button
          variant="outline-danger"
          onClick={() => dispatch(deleteRequestAdmin(req.id))}
          style={{
            fontSize: "0.7rem",
          }}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="outline-danger"
          onClick={() => dispatch(deleteRequest(req.id))}
          style={{
            fontSize: "0.7rem",
          }}
        >
          Delete
        </Button>
      )}
      <div style={{ marginTop: "0rem" }}>
        {editButton === true ? (
          <Form
            md={{ span: 6, offset: 3 }}
            className="mt-2"
            noValidate
            validated={validated}
            onSubmit={submitUpdateRequestForm}
          >
            <Form.Group controlId="formRequestTitle">
              <Form.Label style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
                Request Title
              </Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => {
                  setRequestId(req.id);
                  return setTitle(event.target.value);
                }}
                type="title"
                placeholder="Enter title"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formRequestText">
              <Form.Label style={{ fontSize: "1rem" }}>Request Text</Form.Label>
              <Form.Text className="text-muted">
                This form uses MarkDown text formatting. Learn more{" "}
                <a href="https://commonmark.org/help/">here!</a>
              </Form.Text>
              <Form.Control
                value={content}
                onChange={(event) => {
                  setRequestId(req.id);
                  return setContent(event.target.value);
                }}
                type="text"
                as="textarea"
                rows={3}
                placeholder="Enter content"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a text.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-3">
              <Button variant="primary" type="submit">
                Update Request
              </Button>
            </Form.Group>
          </Form>
        ) : null}
      </div>
    </>
  );
}
