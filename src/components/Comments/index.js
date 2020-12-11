import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../../store/post/selectors";
import { Accordion, Button, Card, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  deletePostComment,
  deletePostCommentAdmin,
  deletePostReply,
  deletePostReplyAdmin,
  postNewPostComment,
  postNewPostReply,
} from "../../store/post/actions";
import {
  deleteRequestComment,
  deleteRequestCommentAdmin,
  deleteRequestReply,
  deleteRequestReplyAdmin,
  postNewRequestComment,
  postNewRequestReply,
} from "../../store/request/actions";
import Loading from "../Loading";
import { selectRequests } from "../../store/request/selectors";
import { selectUser } from "../../store/user/selectors";
import EditComment from "../EditComment";
import EditReply from "../EditReply";

export default function Comments({ requestId, commentType }) {
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const posts = useSelector(selectAllPosts);
  const requests = useSelector(selectRequests);
  const user = useSelector(selectUser);
  const id = parseInt(params.post) || requestId;
  const [commentId, setCommentId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editReply, setEditReply] = useState(false);
  const [editReplyId, setEditReplyId] = useState(0);

  const postOrRequest =
    commentType === "post"
      ? posts.find((post) => post.id === id)
      : requests.find((req) => req.id === id);

  function submitNewComment(event) {
    event.preventDefault();

    if (commentType === "post") {
      dispatch(postNewPostComment(commentText, id));
      return setCommentText("");
    }

    dispatch(postNewRequestComment(commentText, id));
    setCommentText("");
  }

  function submitNewReply(event) {
    event.preventDefault();

    if (commentType === "post") {
      dispatch(postNewPostReply(replyText, id, commentId));
      return setReplyText("");
    }

    dispatch(postNewRequestReply(replyText, id, commentId));
    setReplyText("");
  }

  return (
    <div>
      <h5 style={{ marginTop: "0.5rem", marginLeft: "1rem" }}>Comments</h5>
      {!postOrRequest ? (
        <Loading />
      ) : (
        postOrRequest.comments.map((comment) => {
          return (
            <Card
              border="secondary"
              bg="light"
              key={comment.id}
              style={{ width: "60rem" }}
              className="mb-2"
            >
              <Card.Body>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>

              <Card.Footer
                style={{
                  fontSize: "0.7rem",
                  borderBottom: "solid 1px lightgrey",
                }}
              >
                by {comment.user.name} on{" "}
                {moment(comment.createdAt).format("ddd DD MMMM YYYY HH:mm")}{" "}
                {user && user.id === comment.user.id ? (
                  <>
                    <Button
                      style={{
                        fontSize: "0.7rem",
                      }}
                      size="sm"
                      onClick={(e) => {
                        setEdit(!edit);
                        setEditId(e.target.value);
                      }}
                      variant={"outline-primary"}
                      value={comment.id}
                    >
                      {edit && parseInt(editId) === comment.id
                        ? "Close"
                        : "Edit"}
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={
                        commentType === "post"
                          ? () => {
                              dispatch(deletePostComment(comment.id, id));
                            }
                          : () => {
                              dispatch(deleteRequestComment(comment.id, id));
                            }
                      }
                      style={{
                        fontSize: "0.7rem",
                      }}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </>
                ) : user.isAdmin ? (
                  <Button
                    style={{
                      fontSize: "0.7rem",
                    }}
                    onClick={
                      commentType === "post"
                        ? () => {
                            dispatch(deletePostCommentAdmin(comment.id, id));
                          }
                        : () => {
                            dispatch(deleteRequestCommentAdmin(comment.id, id));
                          }
                    }
                    size="sm"
                    variant="outline-danger"
                    value={comment.id}
                  >
                    Delete{" "}
                  </Button>
                ) : null}
                {edit && parseInt(editId) === comment.id ? (
                  <EditComment
                    id={comment.id}
                    content={comment.content}
                    commentType={commentType}
                    postId={parseInt(params.post)}
                    requestId={requestId}
                    edit={() => {
                      setEdit(false);
                    }}
                  />
                ) : null}
              </Card.Footer>

              {comment.answers.length ? (
                <Accordion>
                  <Card
                    bg="light"
                    style={{
                      width: "58rem",
                      marginLeft: "1.9rem",
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Header}
                      style={{
                        background: "lightgrey",
                        fontSize: "0.9rem",
                        margin: "0",
                        padding: "0.5rem",
                      }}
                      eventKey="0"
                    >
                      Replies (click here)
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <div>
                        {comment.answers.map((answer) => {
                          return (
                            <div key={answer.id}>
                              <Card.Body
                                style={{ borderBottom: "solid 1px lightgrey" }}
                              >
                                {answer.content}
                                <p style={{ margin: "0", fontSize: "0.7rem" }}>
                                  by {answer.user.name} on{" "}
                                  {moment(answer.createdAt).format(
                                    "ddd DD MMMM YYYY HH:mm"
                                  )}{" "}
                                  {user && user.id === answer.user.id ? (
                                    <>
                                      <Button
                                        style={{
                                          fontSize: "0.7rem",
                                        }}
                                        size="sm"
                                        onClick={(e) => {
                                          setEditReply(!editReply);
                                          setEditReplyId(e.target.value);
                                        }}
                                        variant="outline-primary"
                                        value={answer.id}
                                      >
                                        {editReply &&
                                        parseInt(editReplyId) === answer.id
                                          ? "Close"
                                          : "Edit"}
                                      </Button>{" "}
                                      <Button
                                        variant="outline-danger"
                                        onClick={
                                          commentType === "post"
                                            ? () => {
                                                dispatch(
                                                  deletePostReply(
                                                    answer.id,
                                                    comment.id,
                                                    id
                                                  )
                                                );
                                              }
                                            : () => {
                                                dispatch(
                                                  deleteRequestReply(
                                                    answer.id,
                                                    comment.id,
                                                    id
                                                  )
                                                );
                                              }
                                        }
                                        style={{
                                          fontSize: "0.7rem",
                                        }}
                                        size="sm"
                                      >
                                        Delete
                                      </Button>
                                    </>
                                  ) : user.isAdmin ? (
                                    <Button
                                      style={{
                                        fontSize: "0.7rem",
                                      }}
                                      size="sm"
                                      onClick={
                                        commentType === "post"
                                          ? () => {
                                              dispatch(
                                                deletePostReplyAdmin(
                                                  answer.id,
                                                  comment.id,
                                                  id
                                                )
                                              );
                                            }
                                          : () => {
                                              dispatch(
                                                deleteRequestReplyAdmin(
                                                  answer.id,
                                                  comment.id,
                                                  id
                                                )
                                              );
                                            }
                                      }
                                      variant="outline-danger"
                                      value={comment.id}
                                    >
                                      Delete{" "}
                                    </Button>
                                  ) : null}
                                </p>
                              </Card.Body>
                              {editReply &&
                              parseInt(editReplyId) === answer.id ? (
                                <EditReply
                                  id={answer.id}
                                  content={answer.content}
                                  commentType={commentType}
                                  postId={parseInt(params.post)}
                                  requestId={requestId}
                                  commentId={comment.id}
                                  edit={() => {
                                    setEditReply(false);
                                  }}
                                />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              ) : null}

              <Accordion>
                <Card
                  bg="light"
                  style={{
                    width: "58rem",
                    marginLeft: "1.9rem",
                  }}
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    style={{
                      background: "lightgrey",
                      fontSize: "0.9rem",
                      margin: "0",
                      padding: "0.5rem",
                    }}
                    eventKey="0"
                  >
                    Reply to this comment (click here)
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <div>
                      <Form as={Col} md={{ span: 8 }} className="mt-3">
                        <h6>New reply:</h6>
                        <Form.Group controlId="formBasicReplyText">
                          <Form.Control
                            value={replyText}
                            onChange={(event) => {
                              setCommentId(comment.id);
                              return setReplyText(event.target.value);
                            }}
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
            </Card>
          );
        })
      )}

      <Form as={Col} md={{ span: 6 }} className="mt-3">
        <h5>New comment:</h5>
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
