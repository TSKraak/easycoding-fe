import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/index";
import EditPostForm from "../../components/EditPostForm/index";
import { selectAllPosts } from "../../store/post/selectors";
import { useParams } from "react-router-dom";
import { fetchPosts } from "../../store/post/actions";

export default function EditPostPage() {
  const { post: id } = useParams();
  const posts = useSelector(selectAllPosts);
  const post = posts.find((post) => post.id === parseInt(id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts.length) {
      return dispatch(fetchPosts);
    }
  }, [dispatch, posts.length]);

  return <div>{!post ? <Loading /> : <EditPostForm post={post} />}</div>;
}
