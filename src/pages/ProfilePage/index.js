import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading/index";
import ProfileForm from "../../components/ProfileForm";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  return <div>{!user.name ? <Loading /> : <ProfileForm user={user} />}</div>;
}
