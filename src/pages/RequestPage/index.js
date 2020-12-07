import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayRequests from "../../components/DisplayRequests";
import Loading from "../../components/Loading";
import { selectAppLoading } from "../../store/appState/selectors";
import { fetchRequests } from "../../store/request/actions";
import { selectRequests } from "../../store/request/selectors";

export default function RequestPage() {
  const dispatch = useDispatch();
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectAppLoading);
  console.log(requests);
  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);
  return (
    <div>
      <h1>Request page</h1>
      {loading ? (
        <Loading />
      ) : (
        requests.all.map((req) => {
          return <DisplayRequests key={req.id} request={req} />;
        })
      )}
    </div>
  );
}
