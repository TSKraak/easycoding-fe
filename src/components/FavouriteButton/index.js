import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavourite, postFavourite } from "../../store/user/actions";
import { selectUserFavourite } from "../../store/user/selectors";

export default function FavouriteButton(props) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectUserFavourite);
  const favourited = favourites
    ? favourites.find((fav) => {
        return fav.id === parseInt(props.postId);
      })
    : [];
  const handleFavourite = (e) => {
    e.preventDefault();
    if (!favourited) {
      dispatch(postFavourite(props.postId));
    }
    dispatch(deleteFavourite(props.postId));
  };
  return (
    <div>
      <Button
        onClick={handleFavourite}
        variant={!favourited ? "outline-primary" : "primary"}
      >
        {!favourited ? "Favourite" : "Remove"}
      </Button>
    </div>
  );
}
