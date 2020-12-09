import React, { useEffect } from "react";
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
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!requests.length) {
      dispatch(fetchRequests);
    }
  }, [dispatch, requests.length]);

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
          type="text"
          placeholder="Search For Requests"
          className="mr-sm-2"
        />
        <Button variant="outline-primary">Search</Button>
        <p style={{ margin: "20px" }}>or</p>
        <Link to="/requests/new">
          <Button variant="success">Create New Request</Button>
        </Link>
      </Form>
      {loading ? (
        <Loading />
      ) : (
        requests.map((req) => {
          return (
            <Card key={req.id} style={{ margin: "1rem", width: "60rem" }}>
              <Card.Header>{req.title}</Card.Header>
              <Card.Body>
                <Card.Text>{req.content}</Card.Text>
              </Card.Body>
              <Card.Footer
                style={{
                  fontSize: "0.7rem",
                  borderBottom: "inherit",
                  marginBottom: "0.5rem",
                }}
              >
                Requested by {req.user.name} on{" "}
                {moment(req.createdAt).format("ddd DD MMMM YYYY HH:mm")}
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
