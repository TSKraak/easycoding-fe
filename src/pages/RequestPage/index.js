import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchRequests } from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";
import { Button, Card, Form, FormControl } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

export default function RequestPage() {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(fetchRequests);
  }, [dispatch]);

  async function submitForm(event) {
    event.preventDefault();

    setSearchResult(
      requests.filter((request) => {
        if (request.content.indexOf(searchText) !== -1) {
          return true;
        } else {
          return false;
        }
      })
    );

    setSearchText("");
  }

  console.log("what is searched requests", searchResult);

  return (
    <div>
      <h1>Request page</h1>
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
          placeholder="Search For Requests"
          className="mr-sm-2"
        />
        <Button variant="outline-primary" onClick={submitForm}>
          Search
        </Button>
        <p style={{ margin: "20px" }}>or</p>
        <Link to="/requests/new">
          <Button variant="success">Create New Request</Button>
        </Link>
      </Form>
      {loading || !searchResult ? (
        <Loading />
      ) : (
        searchResult.map((req) => {
          return (
            <Card key={req.id} style={{ margin: "1rem", width: "30rem" }}>
              <Card.Header>{req.title}</Card.Header>
              <Card.Body>
                <Card.Text>{req.content}</Card.Text>
              </Card.Body>
              <Card.Footer>
                requested by {req.user.name}{" "}
                {moment(req.createdAt).format("DD/MM/YYYY")}
              </Card.Footer>
            </Card>
          );
        })
      )}
    </div>
  );
}
