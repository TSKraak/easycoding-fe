import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";

export default function ViewPostDetails() {
  const { post } = useParams();
  const postId = parseInt(post);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const detailsPost = posts.find((post) => {
    if (post.id === postId) {
      return true;
    } else {
      return false;
    }
  });

  console.log("what is detailsPost", detailsPost);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);

  return (
    <Jumbotron fluid>
      <Container>
        <h3>Post Title</h3>
        <p>Post Text</p>
      </Container>
    </Jumbotron>
  );
}
