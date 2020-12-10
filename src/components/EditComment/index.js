import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import { deletePostComment, editPostComment } from "../../store/post/actions";
import { deleteRequestComment, editRequestComment } from "../../store/request/actions";

export default function EditComment(props) {
  const [text, setText] = useState(props.content);
  const dispatch = useDispatch();

  function editComment(event) {
    event.preventDefault();

    if (text === "") {
      return;
    }

    if (props.commentType === "post") {
      dispatch(editPostComment(text, props.id, props.postId));
      props.edit();
      return setText("");
    }

    dispatch(editRequestComment(text, props.id, props.requestId));
    setText("");
    props.edit();
  }

  function deleteComment(event) {
    event.preventDefault();

    if (props.commentType === "post") {
      dispatch(deletePostComment(props.id, props.postId));
      props.edit();
      return setText("");
    }

    dispatch(deleteRequestComment(props.id, props.requestId));
    setText("");
    props.edit();
  }

  return (
    <div>
      <Form as={Col} md={{ span: 6 }} className="mt-3">
        <Form.Group controlId="formBasicCommentText">
          <Form.Control
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
            as="textarea"
            rows={4}
            required
            style={{
              fontSize: "0.7rem",
              borderBottom: "inherit",
            }}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Button
            variant="success"
            type="submit"
            disabled={text ? false : true}
            onClick={editComment}
            style={{
              fontSize: "0.7rem",
              borderBottom: "inherit",
            }}
            size="sm"
          >
            Submit
          </Button>{" "}
          <Button
            variant="danger"
            disabled={text ? false : true}
            onClick={deleteComment}
            style={{
              fontSize: "0.7rem",
              borderBottom: "inherit",
            }}
            size="sm"
          >
            Delete
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
