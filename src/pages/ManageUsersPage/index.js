import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/allUsers/actions";
import { selectAllUsers } from "../../store/allUsers/selectors";
import { Table } from "react-bootstrap";

export default function ManageUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  console.log("what is users", users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
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
                  <td>{!user.isAdmin ? "No" : "Yes"}</td>
                  <td>{!user.accountBlocked ? "No" : "Yes"}</td>
                </tr>
              );
            })}
      </tbody>
    </Table>
  );
}
