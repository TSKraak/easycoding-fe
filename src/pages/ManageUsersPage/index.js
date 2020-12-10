import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, getAllUsers } from "../../store/allUsers/actions";
import { selectAllUsers } from "../../store/allUsers/selectors";
import { Button, Container, Table } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";
import { Redirect } from "react-router-dom";

export default function ManageUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleBlock = (e) => {
    e.preventDefault();
    dispatch(blockUser(e.target.value));
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    // dispatch(blockUser(e.target.value));
  };

  if (!user.isAdmin) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Container>
      <h1
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        All Users
      </h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Blocked</th>
          </tr>
        </thead>
        <tbody>
          {!users
            ? "...Loading"
            : users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {" "}
                      <Button
                        onClick={handleAdmin}
                        value={user.id}
                        variant={!user.isAdmin ? "danger" : "secondary"}
                      >
                        {!user.isAdmin ? "No" : "Yes"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={handleBlock}
                        value={user.id}
                        variant={!user.accountBlocked ? "secondary" : "danger"}
                      >
                        {!user.accountBlocked ? "Block" : "Unblock"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </Container>
  );
}
