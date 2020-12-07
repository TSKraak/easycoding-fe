import React from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <Container
      fluid
      style={{
        background: "lightgrey",
        position: "absolute",
        bottom: "0",
        padding: "1rem",
      }}
    >
      <Row className="justify-content-md-center">
        <Col style={{ textAlign: "center" }}>&#60;Make life easy!&#62;</Col>
        <Col style={{ textAlign: "center" }}>Copyright© 2020 by A-Team 46®</Col>
        <Col style={{ textAlign: "center" }}>
          Contact: <a href="mailto:info@easycoding.com">Send email</a>
        </Col>
      </Row>
    </Container>
  );
}
