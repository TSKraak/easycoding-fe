import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form } from "react-bootstrap";
import { postNewPostComment } from "../../store/post/actions";
import { postNewRequestComment } from "../../store/request/actions";

export default function EditComment(props) {
  const [text, setText] = useState(props.content);
  const dispatch = useDispatch();

  // console.log("WHAT IS ID", id);
  console.log("WHAT IS", props.commentType);

  function editComment(event) {
    event.preventDefault();

    if (props.commentType === "post") {
      dispatch(postNewPostComment(text, props.id));
      return setText("");
    }

    dispatch(postNewRequestComment(text, props.id));
    setText("");
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
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
