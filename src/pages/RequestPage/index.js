import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchRequests } from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";
import { Card } from "react-bootstrap";

export default function RequestPage() {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);
  console.log("what is requests", requests);
  useEffect(() => {
    dispatch(fetchRequests);
  }, [dispatch]);
  return (
    <div>
      <h1>Request page</h1>
      {loading ? (
        <Loading />
      ) : (
        requests.map((req) => {
          return (
            <Card key={req.id} style={{ margin: "1rem", width: "30rem" }}>
              <Card.Body>
                <Card.Header>{req.title}</Card.Header>
                <Card.Text>{req.content}</Card.Text>
              </Card.Body>
              <Card.Footer>written by </Card.Footer>
            </Card>
          );
        })
      )}
    </div>
  );
}
