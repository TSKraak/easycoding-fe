import React, { useEffect } from "react";
import { Button, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPosts } from "../../store/post/actions";
import { selectAllPosts } from "../../store/post/selectors";
import moment from "moment";
import DisplayPicture from "../../components/DisplayPicture/index";
import Comments from "../../components/Comments";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { selectUser } from "../../store/user/selectors";

export default function ViewPostDetails() {
  const { post } = useParams();
  const postId = parseInt(post);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const user = useSelector(selectUser);

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
              <div
                style={{ borderBottom: "solid 1px grey", marginBottom: "1rem" }}
              >
                <h1>{detailsPost.title}</h1>
                <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                  <img
                    src={detailsPost.author.picture}
                    style={{ width: "30px", borderRadius: "50px" }}
                    alt="author-name"
                  />{" "}
                  Written by {detailsPost.author.name} on{" "}
                  {moment(detailsPost.createdAt).format(
                    "ddd DD MMMM YYYY HH:mm"
                  )}{" "}
                  {user.id !== parseInt(detailsPost.userId) ? null : (
                    <Link to={`/posts/edit/${detailsPost.id}`}>
                      <Button
                        style={{ fontSize: "0.8rem" }}
                        variant="outline-secondary"
                      >
                        Edit
                      </Button>
                    </Link>
                  )}
                </p>
              </div>
              <div>
                <ReactMarkdown plugins={[gfm]} children={detailsPost.content} />
              </div>
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
