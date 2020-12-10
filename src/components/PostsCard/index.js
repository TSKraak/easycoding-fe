import React from "react";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import gfm from "remark-gfm";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import FavouriteButton from "../FavouriteButton";
import { deletePostAsAdmin } from "../../store/post/actions";

export default function PostsCard({ post }) {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function deleteByAdmin(event) {
    console.log(event.target.value);
    event.preventDefault();
    dispatch(deletePostAsAdmin(event.target.value));
  }

  return (
    <Card
      border="dark"
      key={post.id}
      style={{ margin: "1rem", width: "20rem" }}
    >
      <Card.Header as="h6">
        {!token ? null : <FavouriteButton postId={post.id} />}{" "}
        <Link style={{ color: "inherit" }} to={`/posts/details/${post.id}`}>
          {post.title}
        </Link>
      </Card.Header>
      <Card.Body>
        <ReactMarkdown plugins={[gfm]} children={post.content.slice(0, 100)} />
        ...
      </Card.Body>

      <Card.Footer style={{ background: "white" }}>
        <Link to={`/posts/details/${post.id}`}>
          <Button variant="outline-secondary">View Details</Button>
        </Link>{" "}
        {user.id !== parseInt(post.userId) ? null : (
          <Link to={`/posts/edit/${post.id}`}>
            <Button variant="outline-secondary">Edit</Button>
          </Link>
        )}{" "}
        {!user.isAdmin ? null : (
          <Button
            onClick={deleteByAdmin}
            value={post.id}
            variant="outline-danger"
          >
            Delete
          </Button>
        )}
      </Card.Footer>
      <Card.Footer style={{ fontSize: "0.8rem" }}>
        By {post.author.name} on{" "}
        {moment(post.createdAt).format("ddd DD MMMM YYYY HH:mm")}
      </Card.Footer>
    </Card>
  );
}
