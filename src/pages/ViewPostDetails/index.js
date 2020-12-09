import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import moment from "moment";
import DisplayPicture from "../../components/DisplayPicture/index";
import Comments from "../../components/Comments";

export default function ViewPostDetails() {
  const { post } = useParams();
  const postId = parseInt(post);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);

  const detailsPost = posts.find((post) => post.id === postId);

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
              {detailsPost?.pictures.length !== 0 ? (
                <DisplayPicture pictures={detailsPost.pictures} />
              ) : null}
            </div>
          )}
        </Container>
      </Jumbotron>
      <Comments commentType="post" />
    </div>
  );
}
