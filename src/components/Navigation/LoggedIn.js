import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import { useHistory } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();

  const onClickLogOut = () => {
    dispatch(logOut());
    return history.push("/");
  };

  return (
    <>
      <NavbarItem path="/profile" linkText={user.email} />
      <Button variant="outline-danger" onClick={() => onClickLogOut()}>
        Logout
      </Button>
    </>
  );
}
