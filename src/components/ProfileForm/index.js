import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Jumbotron,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import UploadUserImage from "../../components/UploadUserPicture";
import { updateUser } from "../../store/user/actions";

export default function ProfileForm(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState(user.password)
  const [picture, setPicture] = useState(props.user.picture);

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
        <Container>
          <Image
            src={props.user.picture}
            style={{ float: "left", width: "150px" }}
            rounded
          />
          <h1>{props.user.name}</h1>
        </Container>
      </Jumbotron>
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Email:</Form.Label>
          <FormControl
            value={email}
            type="text"
            placeholder="Enter Email"
            onChange={(event) => setEmail(event.target.value)}
            className="mr-sm-2"
          />
          <Button variant="outline-primary" onClick={changeEmail}>
            Change Email
          </Button>
        </Form.Group>
      </Form>
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Form.Label>Name:</Form.Label>
        <FormControl
          value={name}
          type="text"
          placeholder="Enter Name"
          onChange={(event) => setName(event.target.value)}
          className="mr-sm-2"
        />
        <Button variant="outline-primary" onClick={changeName}>
          Change Name
        </Button>
      </Form>
      {/* <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Form.Label>Password:</Form.Label>
        <FormControl
          type="text"
          placeholder="Enter Password"
          className="mr-sm-2"
        />
        <Button variant="outline-primary">Change Password</Button>
      </Form> */}
      <Form
        inline
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Form.Label>Profile Picture:</Form.Label>
        <img src={picture} alt="profile-pic" style={{ width: "50px" }} />
        <UploadUserImage onChange={(event) => setPicture(event.target.value)} />
        <Button variant="outline-primary" onClick={changePicture}>
          Change Picture
        </Button>
      </Form>
    </div>
  );
}
