import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import {
  Button,
  Container,
  Form,
  FormControl,
  Image,
  Jumbotron,
} from "react-bootstrap";
import UploadUserImage from "../../components/UploadUserPicture";
import Loading from "../../components/Loading/index";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState(user.password)
  const [picture, setPicture] = useState("");

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setPicture(user.picture);
  }, [user]);

  if (!user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Jumbotron style={{ margin: "50px" }}>
        <Container>
          <Image
            src={user.picture}
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
            {user.name}
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
