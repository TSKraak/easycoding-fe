import React, { useState } from "react";
import { Accordion, Button, Card, Form } from "react-bootstrap";
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    <div>
      <Accordion>
        <Card>
          <Card.Header>
            <Button
              variant="outline-primary"
              onClick={() => {
                setEditButton(editButton === true ? false : true);
              }}
            >
              Edit
            </Button>{" "}
            {user.isAdmin ? (
              <Button
                variant="outline-danger"
                onClick={() => dispatch(deleteRequestAdmin(req.id))}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="outline-danger"
                onClick={() => dispatch(deleteRequest(req.id))}
              >
                Delete
              </Button>
            )}
            {editButton === true ? (
              <Form
                md={{ span: 6, offset: 3 }}
                noValidate
                validated={validated}
                onSubmit={submitUpdateRequestForm}
              >
                <Form.Group controlId="formRequestTitle">
                  <Form.Label>Request Title</Form.Label>
                  <Form.Control
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      return setRequestId(req.id);
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
                  <Form.Label>Request Text</Form.Label>
                  <Form.Control
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    type="text"
                    as="textarea"
                    rows={2}
                    placeholder="Enter content"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a text.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mt-5">
                  <Button variant="primary" type="submit">
                    Update Request
                  </Button>
                </Form.Group>
              </Form>
            ) : null}
          </Card.Header>
        </Card>
      </Accordion>
    </div>
  );
}
