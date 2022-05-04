import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className="col-4">
      <img src={props.image} alt="..." />
    </div>
  );
}

export default Card;
