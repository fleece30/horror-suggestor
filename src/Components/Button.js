import React from "react";
import "./Button.scss";

export function Button(props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}
