import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "../../store/appState/selectors";
import {
  deleteRequest,
  fetchRequests,
  updateRequest,
} from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";
import { Accordion, Button, Card, Form, FormControl } from "react-bootstrap";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import Comments from "../../components/Comments";
import { selectToken } from "../../store/user/selectors";

export default function RequestPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validated, setValidated] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [editButton, setEditButton] = useState(false);
  const history = useHistory();
  const token = useSelector(selectToken);
  const { searchText: searchTextParams } = useParams();
  const [searchText, setSearchText] = useState(
    !searchTextParams ? "" : searchTextParams
  );
  const [search, setSearch] = useState(searchText);
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);
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

  async function submitUpdateRequestForm(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    event.preventDefault();

    if (title !== "" && content !== "") {
      await dispatch(updateRequest(requestId, title, content));
      setTitle("");
      setContent("");
      setRequestId("");
      setEditButton(false);
      history.push("/requests");
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
            return (
              <Card
                key={req.id}
                style={{ margin: "1rem", width: "60rem", alignSelf: "center" }}
              >
                <Card.Header>
                  {req.title}{" "}
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(deleteRequest(req.id))}
                  >
                    Delete
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{req.content}</Card.Text>
                </Card.Body>
                <Accordion>
                  <Card>
                    <Card.Header>
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setEditButton(editButton === true ? false : true);
                        }}
                      >
                        Edit Request
                      </Button>
                      {editButton === true ? (
                        <Form
                          md={{ span: 6, offset: 3 }}
                          noValidate
                          validated={validated}
                          onSubmit={submitUpdateRequestForm}
                        >
                          <Form.Group controlId="formRequestTitle">
                            <Form.Label>Request Title</Form.Label>
                            <Form.Control
                              value={title}
                              onChange={(event) => {
                                setTitle(event.target.value);
                                return setRequestId(req.id);
                              }}
                              type="title"
                              placeholder="Enter title"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a title.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group controlId="formRequestText">
                            <Form.Label>Request Text</Form.Label>
                            <Form.Control
                              value={content}
                              onChange={(event) =>
                                setContent(event.target.value)
                              }
                              type="text"
                              as="textarea"
                              rows={2}
                              placeholder="Enter content"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a text.
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mt-5">
                            <Button variant="primary" type="submit">
                              Update Request
                            </Button>
                          </Form.Group>
                        </Form>
                      ) : null}
                    </Card.Header>
                  </Card>
                </Accordion>
                <Card.Footer
                  style={{
                    borderBottom: "inherit",
                    fontSize: "0.8rem",
                    // marginBottom: "0.5rem"
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
                    // className="mb-2"
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
    </div>
  );
}
