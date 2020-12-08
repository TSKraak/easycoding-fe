import React, { useState } from "react";
import {
  Button,
  Card,
  CardDeck,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function HomePage() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const searchNow = () => {
    return history.push(`/posts/${searchText}`);
  };

  return (
    <div className="HomePage-Container">
      <h1>Welcome to &#60;Easy Coding&#62;</h1>

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
            onClick={() => searchNow()}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>

      <CardDeck>
        <Card style={{ width: "18rem" }}>
          <Card.Header as="h3">Posts</Card.Header>
          <Card.Body>
            <Card.Text>
              Share you experience and knowledge about a feature which you
              implemented. Especially when the docs weren't clear enough and it
              took way more time than was necessary.<br></br>
              <br></br>
              Make a post now and make life easier for your fellow coders!
            </Card.Text>
            <Button className="mr-2" variant="outline-primary" href="/posts">
              View Posts
            </Button>
            <Button variant="outline-primary" href="/posts/new">
              Create Post
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Header as="h3">Requests</Card.Header>
          <Card.Body>
            <Card.Text>
              Are you having trouble with the docs of a library or package? And
              the answer is not on the Posts page?<br></br>
              <br></br>
              Send in a request for help! Other users will share their knowledge
              and post it to help you on your way.
            </Card.Text>
            <Button className="mr-2" variant="outline-primary" href="/requests">
              View Requests
            </Button>
            <Button variant="outline-primary" href="/requests/new">
              Create Request
            </Button>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}
