import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/index";
import EditPostForm from "../../components/EditPostForm/index";
import { selectAllPosts } from "../../store/post/selectors";
import { useParams } from "react-router-dom";

export default function EditPostPage() {
  const { post: id } = useParams();
  const posts = useSelector(selectAllPosts);
  const post = posts.find((post) => post.id === parseInt(id));
  console.log(post, `from`, posts);
  return <div>{!post ? <Loading /> : <EditPostForm post={post} />}</div>;
}
