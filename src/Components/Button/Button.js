import React from "react";
import "./Button.scss";

export function Button({ hidden = false, onClick, text }) {
  return (
    <button style={{ display: hidden ? "none" : "inline" }} onClick={onClick}>
      {text}
    </button>
  );
}
