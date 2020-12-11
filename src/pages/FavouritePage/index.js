import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import {
  selectToken,
  selectUser,
  selectUserFavourite,
} from "../../store/user/selectors";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import PostsCard from "../../components/PostsCard";

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
        <InputGroup style={{ width: "20%", margin: "5% 0% 5% 0%" }}>
          <FormControl
            placeholder="Search Posts for.."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              type="submit"
              onClick={submitForm}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
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
        {!favourites ? (
          <Loading />
        ) : !search ? (
          favourites.map((post) => {
            return <PostsCard key={post.id} post={post} />;
          })
        ) : (
          searchResult.map((post) => {
            return <PostsCard key={post.id} post={post} />;
          })
        )}
        {favourites && search && !searchResult.length ? (
          <h3>No search results</h3>
        ) : null}
      </div>
    </div>
  );
}
