import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { selectToken } from "../../store/user/selectors";
import PostsCard from "../../components/PostsCard";

export default function PostPage() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const { searchText: searchTextParams } = useParams();
  const [searchText, setSearchText] = useState(
    !searchTextParams ? "" : searchTextParams
  );
  const [search, setSearch] = useState(searchText);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const searchResult = search
    ? posts.filter(
        (post) =>
          post.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    : "";

  useEffect(() => {
    dispatch(fetchPosts);
    if (searchTextParams) {
      setSearchText(searchTextParams);
      setSearch(searchTextParams);
    }
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
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        {!posts ? (
          <Loading />
        ) : !search ? (
          posts.map((post) => {
            return <PostsCard key={post.id} post={post} />;
          })
        ) : (
          searchResult.map((post) => {
            return <PostsCard key={post.id} post={post} />;
          })
        )}
        {posts && search && !searchResult.length ? (
          <h3>No search results</h3>
        ) : null}
      </div>
    </div>
  );
}
