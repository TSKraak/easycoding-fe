import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchRequests } from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";
import { Accordion, Button, Card, Form, FormControl } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import Comments from "../../components/Comments";

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
        requests.map((req) => {
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
              <Accordion>
                <Card
                  bg="light"
                  style={{
                    width: "58rem",
                    marginLeft: "2rem",
                  }}
                  className="mb-2"
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    style={{
                      background: "lightgrey",
                      fontSize: "0.9rem",
                      margin: "0",
                      padding: "0.5rem",
                    }}
                    eventKey="0"
                  >
                    View comments (click here)
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Comments requestId={req.id} commentType="request" />
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card>
          );
        })
      ) : !searchResult.length ? (
        <h4>No search results..</h4>
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
              <Accordion>
                <Card
                  bg="light"
                  style={{
                    width: "58rem",
                    marginLeft: "2rem",
                  }}
                  className="mb-2"
                >
                  <Accordion.Toggle
                    as={Card.Header}
                    style={{
                      background: "lightgrey",
                      fontSize: "0.9rem",
                      margin: "0",
                      padding: "0.5rem",
                    }}
                    eventKey="0"
                  >
                    View comments (click here)
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Comments requestId={req.id} commentType="request" />
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card>
          );
        })
      )}
    </div>
  );
}
