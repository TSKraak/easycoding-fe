import React, { useState } from "react";
import {
  Button,
  Card,
  CardDeck,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const searchNow = (e) => {
    e.preventDefault();
    return history.push(`/posts/${searchText}`);
  };

  return (
    <div className="HomePage-Container" style={{ textAlign: "center" }}>
      <h1>Welcome to &#60;Easy Coding&#62;</h1>
      <Form>
        <InputGroup style={{ width: "30%", margin: "5% 35% 5% 35%" }}>
          <FormControl
            placeholder="Search Posts for.."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              type="submit"
              onClick={searchNow}
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <CardDeck>
        <Card
          bg="secondary"
          text="light"
          border="dark"
          style={{ width: "18rem" }}
        >
          <Card.Header as="h3">
            <Link style={{ color: "white" }} to="/posts">
              Posts
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.3rem" }}>
              Share you experience and knowledge about a feature which you
              implemented. Especially when the docs weren't clear enough and it
              took way more time than was necessary.<br></br>
              <br></br>
              Make a post now and make life easier for your fellow coders!
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button className="mr-2" variant="primary" href="/posts">
              View Posts
            </Button>
            <Button variant="success" href="/post/new">
              Create Post
            </Button>
          </Card.Footer>
        </Card>

        <Card
          bg="secondary"
          text="light"
          border="dark"
          style={{ width: "18rem" }}
        >
          <Card.Header as="h3">
            <Link style={{ color: "white" }} to="/posts">
              Requests
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Text style={{ fontSize: "1.3rem" }}>
              Are you having trouble with the docs of a library or package? And
              the answer is not already on the Posts page?<br></br>
              <br></br>
              Send in a request for help! Other users will share their knowledge
              and post it to help you on your way.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button className="mr-2" variant="primary" href="/requests">
              View Requests
            </Button>
            <Button variant="success" href="/request/new">
              Create Request
            </Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    </div>
  );
}
