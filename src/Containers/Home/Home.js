import React, { useState } from "react";

import _map from 'lodash/map';

import { Button } from "../../Components/Button";
import { Card } from "../../Components/Card";
import { Link } from "react-router-dom";

import { options } from './home.constants';

import "./Home.scss";

export function Home() {
  const [selectedCardIndex, setCardIndex] = useState(-1);

  const renderMovieOptions = options => _map(options, (option, index) => (
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
          <Link
            to={selectedCardIndex === -1 ? "" : options[selectedCardIndex].link}
          >
            <Button text="PROCEED" />
          </Link>
        </div>
      </div>
    </div>
  );
}
