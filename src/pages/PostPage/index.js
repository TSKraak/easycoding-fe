import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import FavouriteButton from "../../components/FavouriteButton";
import Loading from "../../components/Loading";

export default function PostPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  console.log("what is posts", posts);
  const { searchText: searchTextParams } = useParams();
  console.log("what is params", searchTextParams);

  useEffect(() => {
    dispatch(fetchPosts);
    setSearchText(searchTextParams);
    // setSearchResult(
    //   posts.filter((post) => {
    //     if (post.content.indexOf(searchText) !== -1) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   })
    // );
  }, [dispatch, searchTextParams, searchText]);

  async function submitForm(event) {
    event.preventDefault();

    setSearchResult(
      posts.filter((post) => {
        if (post.content.indexOf(searchText) !== -1) {
          return true;
        } else {
          return false;
        }
      })
    );

    setSearchText("");
  }

  console.log("what is searchResults", searchResult);

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
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          type="text"
          placeholder="Search For Posts"
          className="mr-sm-2"
        />
        <Button variant="outline-primary" onClick={submitForm}>
          Search
        </Button>
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
        {!posts ? (
          <Loading />
        ) : !searchResult ? (
          posts.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Link to={`/posts/details/${post.id}`}>
                    <Button variant="outline-primary">
                      View Details of {post.title}
                    </Button>
                  </Link>
                  <FavouriteButton postId={post.id} />{" "}
                </Card.Body>
                <Card.Footer>written by {post.author.name}</Card.Footer>
              </Card>
            );
          })
        ) : !searchResult.length ? (
          <h3>No search results</h3>
        ) : (
          searchResult.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Link to={`/posts/details/${post.id}`}>
                    <Button variant="outline-primary">
                      View Details of {post.title}
                    </Button>
                  </Link>
                  <FavouriteButton postId={post.id} />{" "}
                </Card.Body>
                <Card.Footer>written by {post.author.name}</Card.Footer>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
