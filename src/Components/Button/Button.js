import React from "react";
import "./Button.scss";

export function Button(props) {
  return (
    <button
      style={{ display: props.hidden ? "block" : "none" }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
