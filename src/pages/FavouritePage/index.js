import React, { useState } from "react";
import moment from "moment";
import { Card, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import FavouriteButton from "../../components/FavouriteButton";
import {
  selectToken,
  selectUser,
  selectUserFavourite,
} from "../../store/user/selectors";
import { deletePostAsAdmin } from "../../store/post/actions";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function FavouritePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const favourites = useSelector(selectUserFavourite);
  const user = useSelector(selectUser);
  const { searchText: searchTextParams } = useParams();
  const [searchText, setSearchText] = useState(
    !searchTextParams ? "" : searchTextParams
  );
  const [search, setSearch] = useState(searchText);

  function deleteByAdmin(event) {
    console.log(event.target.value);
    event.preventDefault();
    dispatch(deletePostAsAdmin(event.target.value));
  }

  const searchResult = search
    ? favourites.filter(
        (post) =>
          post.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    : "";

  useEffect(() => {
    if (searchTextParams) {
      setSearchText(searchTextParams);
      setSearch(searchTextParams);
    }
  }, [dispatch, searchTextParams]);

  if (!user.token) {
    return <Redirect to="/"></Redirect>;
  }

  async function submitForm(event) {
    event.preventDefault();
    setSearch(searchText);
    if (searchText === search) {
      return;
    } else if (!searchText) {
      return history.push(`/favourites`);
    } else {
      return history.push(`/favourites/${searchText}`);
    }
  }
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
        <Link to={!token ? "/login" : "/post/new"}>
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
        {!favourites ? (
          <Loading />
        ) : !search ? (
          favourites.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Header as="h3">
                  {!token ? (
                    <Link to="/login">
                      <Button href="/login" variant="outline-success">
                        Favourite
                      </Button>
                    </Link>
                  ) : (
                    <FavouriteButton postId={post.id} />
                  )}{" "}
                  <Link
                    style={{ color: "inherit" }}
                    to={`/posts/details/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </Card.Header>
                <Card.Body>
                  <ReactMarkdown
                    plugins={[gfm]}
                    children={post.content.slice(0, 100)}
                  />
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
          })
        ) : (
          searchResult.map((post) => {
            return (
              <Card key={post.id} style={{ margin: "1rem", width: "20rem" }}>
                <Card.Header as="h4">
                  {!token ? (
                    <Link to="/login">
                      <Button href="/login" variant="outline-success">
                        Favourite
                      </Button>
                    </Link>
                  ) : (
                    <FavouriteButton postId={post.id} />
                  )}{" "}
                  <Link
                    style={{ color: "inherit" }}
                    to={`/posts/details/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </Card.Header>
                <Card.Body>
                  <ReactMarkdown
                    plugins={[gfm]}
                    children={post.content.slice(0, 100)}
                  />
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
          })
        )}
        {favourites && search && !searchResult.length ? (
          <h3>No search results</h3>
        ) : null}
      </div>
    </div>
  );
}
