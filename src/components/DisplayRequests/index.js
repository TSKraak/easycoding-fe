import React from "react";

export default function DisplayRequests(props) {
  return (
    <div>
      <h2>{props.request.title}</h2>
      <p>{props.request.content}</p>
      <p>{props.request.user.name}</p>
    </div>
  );
}
