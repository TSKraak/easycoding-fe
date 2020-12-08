import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";

export default function NewPostForm() {
  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Create Post</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Post Title</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Post Text</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit">
            Create Post
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
