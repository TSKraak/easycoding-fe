import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../store/user/actions";

export default function ManageUsersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Manage users</h1>
    </div>
  );
}
