import React from "react";
import moment from "moment";
import { Card, Form, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FavouriteButton from "../../components/FavouriteButton";
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
          <Button variant="outline-success">Create New Post</Button>
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
                      <Button variant="outline-primary">View Details</Button>
                    </Link>
                    <FavouriteButton postId={post.id} />{" "}
                  </Card.Body>
                  <Card.Footer style={{ fontSize: "0.8rem" }}>
                    By {post.author.name} on{" "}
                    {moment(post.createdAt).format("ddd DD MMMM YYYY HH:mm")}
                  </Card.Footer>{" "}
                </Card>
              );
            })}
      </div>
    </div>
  );
}
