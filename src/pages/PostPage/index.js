import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import FavouriteButton from "../../components/FavouriteButton";
import Loading from "../../components/Loading";
import { selectToken, selectUser } from "../../store/user/selectors";

export default function PostPage() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  console.log(user.id);
  const { searchText: searchTextParams } = useParams();
  const [searchText, setSearchText] = useState(
    !searchTextParams ? "" : searchTextParams
  );
  const [search, setSearch] = useState(searchText);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const searchResult = search
    ? posts.filter((post) => {
        if (post.content.indexOf(search) !== -1) {
          return true;
        } else {
          return false;
        }
      })
    : "";

  useEffect(() => {
    dispatch(fetchPosts);
    setSearchText(searchTextParams);
    setSearch(searchTextParams);
  }, [dispatch, searchTextParams]);

  async function submitForm(event) {
    event.preventDefault();
    setSearch(searchText);
    if (searchText === search) {
      return;
    } else if (!searchText) {
      return history.push(`/posts`);
    } else {
      return history.push(`/posts/${searchText}`);
    }
  }

  // console.log("what is posts", posts);
  // console.log("what is params", searchTextParams);
  // console.log("what is searchText", searchText);

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
        <Link to={!token ? "/login" : "/posts/new"}>
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
        {!posts ? (
          <Loading />
        ) : !search ? (
          posts.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Link to={`/posts/details/${post.id}`}>
                    <Button variant="outline-primary">View Details</Button>
                  </Link>
                  <FavouriteButton postId={post.id} />
                  {user.id !== parseInt(post.userId) ? null : (
                    <Link to={`/posts/edit/${post.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  )}
                </Card.Body>
                <Card.Footer style={{ fontSize: "0.8rem" }}>
                  By {post.author.name} on{" "}
                  {moment(post.createdAt).format("ddd DD MMMM YYYY HH:mm")}
                </Card.Footer>
              </Card>
            );
          })
        ) : (
          searchResult.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Link to={`/posts/details/${post.id}`}>
                    <Button variant="outline-primary">View Details</Button>
                  </Link>
                  <FavouriteButton postId={post.id} />
                  {user.id !== parseInt(post.userId) ? null : (
                    <Link to={`/posts/edit/${post.id}`}>
                      <Button>Edit</Button>
                    </Link>
                  )}
                </Card.Body>
                <Card.Footer style={{ fontSize: "0.8rem" }}>
                  By {post.author.name} on{" "}
                  {moment(post.createdAt).format("ddd DD MMMM YYYY HH:mm")}
                </Card.Footer>
              </Card>
            );
          })
        )}
        {posts && search && !searchResult.length ? (
          <h3>No search results</h3>
        ) : null}
      </div>
    </div>
  );
}
