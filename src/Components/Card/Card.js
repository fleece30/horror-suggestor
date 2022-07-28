import React from "react";
import "./Card.scss";

export function Card(props) {
  return (
    <div className={`card-body ${props.class}`}>
      <div className="text">{props.name}</div>
    </div>
  );
}
