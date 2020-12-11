import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchRequests } from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";
import DisplayRequest from "../../components/DisplayRequests";

export default function RequestPage() {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);
  const history = useHistory();
  const token = useSelector(selectToken);
  const { searchText: searchTextParams } = useParams();
  const [searchText, setSearchText] = useState(
    !searchTextParams ? "" : searchTextParams
  );
  const [search, setSearch] = useState(searchText);
  const searchResult = search
    ? requests.filter(
        (req) => req.content.toLowerCase().indexOf(search.toLowerCase()) !== -1
      )
    : "";

  useEffect(() => {
    dispatch(fetchRequests);
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
      return history.push(`/requests`);
    } else {
      return history.push(`/requests/${searchText}`);
    }
  }

  return (
    <div>
      <h1>Request page</h1>
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {" "}
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
        <Link to={!token ? "/login" : "/request/new"}>
          <Button variant="outline-success">Create New Request</Button>
        </Link>
      </Form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading || !searchResult ? (
          requests.map((req) => {
            return <DisplayRequest req={req} key={req.id} />;
          })
        ) : !searchResult.length ? (
          <h4>No search results..</h4>
        ) : (
          searchResult.map((req) => {
            return <DisplayRequest req={req} key={req.id} />;
          })
        )}
      </div>
    </div>
  );
}
