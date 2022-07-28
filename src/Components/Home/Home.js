import React, { useState } from "react";

import _map from "lodash/map";

import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { useNavigate } from "react-router-dom";

import { options } from "./home.constants";

import "./Home.scss";

export function Home() {
  const [selectedCardIndex, setCardIndex] = useState(-1);
  const navigate = useNavigate();

  const renderMovieOptions = (options) =>
    _map(options, (option, index) => (
      <div key={index} onClick={() => setCardIndex(index)}>
        <Card
          name={option.name}
          class={selectedCardIndex === index ? "activated" : ""}
        />
      </div>
    ));
  // , "Your Picks"
  return (
    <div className="home-body">
      <div className="main-body">
        <h1>Welcome to Horror Suggestor</h1>
        <div
          className={`options ${selectedCardIndex === -1 ? "" : "animating"}`}
        >
          {renderMovieOptions(options)}
        </div>
        <div
          className={`button ${
            selectedCardIndex === -1 ? "" : "animatingButton"
          }`}
        >
          <Button
            text="PROCEED"
            onClick={() =>
              navigate(
                selectedCardIndex === -1 ? "" : options[selectedCardIndex].link
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
