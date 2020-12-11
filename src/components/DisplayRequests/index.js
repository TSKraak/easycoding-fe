import React from "react";
import { useSelector } from "react-redux";
import { Accordion, Card } from "react-bootstrap";
import moment from "moment";
import Comments from "../../components/Comments";
import { selectUser } from "../../store/user/selectors";
import EditRequestForm from "../../components/EditRequestForm";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function DisplayRequest({ req }) {
  const user = useSelector(selectUser);

  return (
    <div style={{ maxWidth: "60rem", alignSelf: "center", margin: "1rem" }}>
      <Card
        border="dark"
        key={req.id}
        style={{ margin: "auto", width: "auto" }}
      >
        <Card.Header as="h6" style={{ fontWeight: "bold" }}>
          {req.title}
        </Card.Header>
        <Card.Body>
          <ReactMarkdown plugins={[gfm]} children={req.content} />
        </Card.Body>
        {user.id === req.user.id || user.isAdmin ? (
          <Card.Footer
            style={{
              background: "none",
            }}
          >
            {" "}
            <EditRequestForm req={req} />{" "}
          </Card.Footer>
        ) : null}
        <Card.Footer
          style={{
            borderBottom: "solid 1px lightgrey",
            fontSize: "0.8rem",
          }}
        >
          Requested by {req.user.name} on{" "}
          {moment(req.createdAt).format("ddd DD MMMM YYYY HH:mm")}{" "}
        </Card.Footer>
        <Accordion>
          <Card
            border="secondary"
            bg="light"
            style={{
              width: "58rem",
              marginLeft: "1.9rem",
            }}
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
    </div>
  );
}
