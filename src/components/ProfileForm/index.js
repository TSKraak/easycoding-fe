import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Jumbotron,
} from "react-bootstrap";
import UploadUserImage from "../../components/UploadUserPicture";

export default function ProfileForm(props) {
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  // const [password, setPassword] = useState(user.password)
  const [picture, setPicture] = useState(props.user.picture);

  return (
    <div>
      <Jumbotron style={{ margin: "50px" }}>
        <Container>
          <Image
            src={props.user.picture}
            style={{ float: "left", width: "150px" }}
            rounded
          />
          <h3
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {props.user.name}
          </h3>
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
        <Form.Label>Email:</Form.Label>
        <FormControl
          value={email}
          type="text"
          placeholder="Enter Email"
          onChange={(event) => setEmail(event.target.value)}
          className="mr-sm-2"
        />
        <Button variant="outline-primary">Change Email</Button>
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
        <Button variant="outline-primary">Change Name</Button>
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
        <Button variant="outline-primary">Change Picture</Button>
      </Form>
    </div>
  );
}
