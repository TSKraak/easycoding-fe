import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import moment from "moment";
import DisplayPicture from "../../components/DisplayPicture/index";

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
    <div>
      <Jumbotron fluid>
        <Container>
          {!detailsPost ? (
            "...Loading"
          ) : (
            <div>
              <h3>{detailsPost.title}</h3>
              <p>
                <strong>
                  Written by {detailsPost.author.name}{" "}
                  {moment(detailsPost.createdAt).format("DD/MM/YYYY")}
                  <img
                    src={detailsPost.author.picture}
                    style={{ width: "30px" }}
                    alt="author-name"
                  />
                </strong>
              </p>
              <p>{detailsPost.content}</p>
            </div>
          )}
        </Container>
      </Jumbotron>
      {detailsPost?.pictures.length !== 0 ? (
        <DisplayPicture pictures={detailsPost.pictures} />
      ) : null}
    </div>
  );
}