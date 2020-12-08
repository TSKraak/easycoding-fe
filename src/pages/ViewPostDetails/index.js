import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

export default function ViewPostDetails() {
  return (
    <Jumbotron fluid>
      <Container>
        <h3>Post Title</h3>
        <p>Post Text</p>
      </Container>
    </Jumbotron>
  );
}
