import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  Jumbotron,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import UploadUserImage from "../../components/UploadUserPicture";
import { updateUser } from "../../store/user/actions";

export default function ProfileForm(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState(user.password)
  const [picture, setPicture] = useState("");

  const changeEmail = (e) => {
    e.preventDefault();
    dispatch(updateUser({ email }));
  };
  const changeName = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name }));
  };
  const changePicture = (e) => {
    e.preventDefault();
    dispatch(updateUser({ picture }));
  };

  return (
    <div>
      <Jumbotron>
        <div style={{ float: "left" }}>
          <Image src={props.user.picture} style={{ width: "15vw" }} rounded />
        </div>
        <Container>
          <div>
            <h1>{props.user.name}</h1>
          </div>
        </Container>
      </Jumbotron>

      <Form as={Col} md={{ span: 6, offset: 4 }} className="mt-5">
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm="3">
            Email:
          </Form.Label>
          <Col sm="4">
            <FormControl
              value={email}
              type="text"
              placeholder="Enter Email"
              onChange={(event) => setEmail(event.target.value)}
              className="mr-sm-2"
            />
          </Col>
          <Col sm="3">
            <Button
              style={{ fontSize: "0.8rem", padding: "0.5rem" }}
              variant="outline-primary"
              onClick={changeEmail}
            >
              Change Email
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicName">
          <Form.Label column sm="3">
            Name:
          </Form.Label>
          <Col sm="4">
            <FormControl
              value={name}
              type="text"
              placeholder="Enter Name"
              onChange={(event) => setName(event.target.value)}
              className="mr-sm-2"
            />
          </Col>
          <Col sm="3">
            <Button
              style={{ fontSize: "0.8rem", padding: "0.5rem" }}
              variant="outline-primary"
              onClick={changeName}
            >
              Change Name
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPicture">
          <Form.Label column sm="3">
            Profile Picture:
          </Form.Label>
          <Col sm="4">
            <UploadUserImage setPicture={setPicture} />
          </Col>
          <Col sm="3">
            <Button
              style={{ fontSize: "0.8rem", padding: "0.5rem" }}
              variant="outline-primary"
              onClick={changePicture}
            >
              Change Picture
            </Button>
          </Col>
        </Form.Group>
      </Form>
      {picture ? (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Preview:
          <p>
            <img
              src={picture}
              alt="profile-pic"
              style={{
                width: "200px",
                marginTop: "1rem",
                borderRadius: "10px",
              }}
            />
          </p>
        </div>
      ) : null}
    </div>
  );
}
