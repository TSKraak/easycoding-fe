import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../../store/post/selectors";
import { Accordion, Button, Card, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Comments() {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const posts = useSelector(selectAllPosts); // we need to select a specific post by id, or send it to the component

  const { id } = params;

  function submitNewComment(event) {
    event.preventDefault();

    // dispatch(postNewComment(commentText, parseInt(id)));

    setCommentText("");
  }

  function submitNewReply(event, commentId) {
    event.preventDefault();

    // dispatch(postNewReply(replyText, commentId));

    setReplyText("");
  }

  return (
    <div>
      <h5>Comments</h5>
      {posts[0].comments.map((comment) => {
        return (
          <Card
            bg="light"
            key={comment.id}
            style={{ width: "50rem" }}
            className="mb-2"
          >
            <Card.Body>
              <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
            <Card.Footer
              style={{
                fontSize: "0.7rem",
                borderBottom: "inherit",
              }}
            >
              by {comment.user.name} on{" "}
              {moment(comment.createdAt).format("ddd DD MMMM YYYY HH:mm")}
            </Card.Footer>

            {comment.answers.length
              ? comment.answers.map((answer) => {
                  return (
                    <Accordion key={answer.id}>
                      <Card
                        bg="light"
                        style={{
                          width: "47rem",
                          marginLeft: "2rem",
                        }}
                        className="mb-2"
                      >
                        <Accordion.Toggle
                          as={Card.Header}
                          style={{ background: "lightgrey" }}
                          eventKey="0"
                        >
                          Replies (click to show)
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <div>
                            <Card.Body
                              style={{ borderBottom: "solid 1px lightgrey" }}
                            >
                              {answer.content}
                              <p style={{ margin: "0", fontSize: "0.7rem" }}>
                                by {answer.user.name} on{" "}
                                {moment(answer.createdAt).format(
                                  "ddd DD MMMM YYYY HH:mm"
                                )}
                              </p>
                            </Card.Body>
                            <Form as={Col} md={{ span: 8 }} className="mt-3">
                              <h6>New reply:</h6>
                              <Form.Group controlId="formBasicReplyText">
                                <Form.Control
                                  value={replyText}
                                  onChange={(event) =>
                                    setReplyText(event.target.value)
                                  }
                                  type="text"
                                  as="textarea"
                                  rows={4}
                                  placeholder="Type your reply here.."
                                  required
                                />
                              </Form.Group>

                              <Form.Group className="mt-3">
                                <Button
                                  variant="success"
                                  type="submit"
                                  disabled={replyText ? false : true}
                                  onClick={submitNewReply}
                                >
                                  Post reply
                                </Button>
                              </Form.Group>
                            </Form>
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  );
                })
              : null}
          </Card>
        );
      })}

      <Form as={Col} md={{ span: 6 }} className="mt-5">
        <h5 className="mt-5">New comment:</h5>
        <Form.Group controlId="formBasicCommentText">
          <Form.Control
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            type="text"
            as="textarea"
            rows={4}
            placeholder="Type your comment here.."
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Button
            variant="success"
            type="submit"
            disabled={commentText ? false : true}
            onClick={submitNewComment}
          >
            Post comment
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
