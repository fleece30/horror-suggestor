import React, { useState } from "react";

<<<<<<< HEAD
import _map from 'lodash/map';

import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { Link } from "react-router-dom";

import { options } from './home.constants';
=======
import _map from "lodash/map";

import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { useNavigate } from "react-router-dom";

import { options } from "./home.constants";
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f

import "./Home.scss";

export function Home() {
  const [selectedCardIndex, setCardIndex] = useState(-1);
<<<<<<< HEAD

  const renderMovieOptions = options => _map(options, (option, index) => (
      <div key={index} onClick={() => setCardIndex(index)}>
        <Card
            name={option.name}
            class={selectedCardIndex === index ? "activated" : ""}
        />
      </div>
  ));
=======
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
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
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
<<<<<<< HEAD
          <Link
            to={selectedCardIndex === -1 ? "" : options[selectedCardIndex].link}
          >
            <Button text="PROCEED" />
          </Link>
=======
          <Button
            text="PROCEED"
            onClick={() =>
              navigate(
                selectedCardIndex === -1 ? "" : options[selectedCardIndex].link
              )
            }
          />
>>>>>>> 1a01d78bc91a2818e940cc0715a6fb5f2f1a108f
        </div>
      </div>
    </div>
  );
}
