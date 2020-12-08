import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import { Button, Card, Form, FormControl } from "react-bootstrap";

export default function PostPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  console.log("what is posts", posts);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);

  return (
    <div>
      <h1>Post page</h1>
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <FormControl
          type="text"
          placeholder="Search For Posts"
          className="mr-sm-2"
        />
        <Button variant="outline-info">Search</Button>
      </Form>
      <div>
        {!posts
          ? "...Loading"
          : posts.map((post) => {
              return (
                <Card key={post.id} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Footer>written by {post.author.name}</Card.Footer>
                    <Button variant="outline-info">
                      View Details of {post.title}
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
