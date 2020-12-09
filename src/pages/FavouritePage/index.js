import React from "react";
import { Card, Form, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserFavourite } from "../../store/user/selectors";

export default function FavouritePage() {
  const favourites = useSelector(selectUserFavourite);

  return (
    <div>
      <h1>Favourites</h1>
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
        <Button variant="outline-primary">Search</Button>
        <p style={{ margin: "20px" }}>or</p>
        <Link to="/posts/new">
          <Button variant="success">Create New Post</Button>
        </Link>
      </Form>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {!favourites
          ? "...Loading"
          : favourites.map((post) => {
              return (
                <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Link to={`/posts/details/${post.id}`}>
                      <Button variant="outline-primary">
                        View Details of {post.title}
                      </Button>
                    </Link>
                  </Card.Body>
                  <Card.Footer>written by {post.author.name}</Card.Footer>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
