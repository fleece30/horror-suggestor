import React from "react";
import { STRINGS } from "./Loader.constant";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="center-text">
      <div className="gif">
        <img
          src={`./loader-gifs/${Math.floor(Math.random() * 8 + 1)}.gif`}
          alt="Horror clip"
        />
      </div>
      <div>{STRINGS.loadingText}</div>
    </div>
  );
};

export default Loader;
