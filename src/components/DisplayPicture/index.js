import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAppLoading } from "../../store/appState/selectors";
import Loading from "../Loading";
import "./DisplayImage.css";

export default function DisplayPicture(props) {
  const loading = useSelector(selectAppLoading);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Carousel className="displayImageCarousel">
        {props.pictures.map((pic) => {
          return (
            <Carousel.Item key={pic.id} interval={10000}>
              <div className="displayImageBoxOver">
                <div className="displayImageBox">
                  <img
                    className="d-block displayImage"
                    src={pic.url}
                    alt={pic.name}
                  />
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
