import React, { useState } from "react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { Link } from "react-router-dom";
import "./Home.scss";

export function Home() {
  const [selectedCardIndex, setCardIndex] = useState(-1);
  const options = [
    { name: "Random", link: "/randommovies" },
    { name: "Search", link: "/search" },
    { name: "The Like Tree", link: "/theliketree" },
    { name: "Search similar", link: "/searchsimilar" },
  ];
  // , "Your Picks"
  return (
    <div className="home-body">
      <div className="main-body">
        <h1>Welcome to Horror Suggestor</h1>
        <div
          className={`options ${selectedCardIndex === -1 ? "" : "animating"}`}
        >
          {options.map((option, index) => {
            return (
              <div key={index} onClick={() => setCardIndex(index)}>
                <Card
                  name={option.name}
                  class={selectedCardIndex === index ? "activated" : ""}
                />
              </div>
            );
          })}
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
