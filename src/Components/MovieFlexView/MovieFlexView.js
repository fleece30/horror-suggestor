import React from "react";
import _map from "lodash/map";
import "./MovieFlexView.scss";

import { Button } from "../Button/Button";

const MovieFlexView = ({ movies }) => {
  const renderInfo = (movie) => {
    return (
      <div className="card">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        {movie.genres === undefined || movie.genres.length === 0 ? (
          ""
        ) : (
          <span>{movie.genres?.map((genre) => genre.name).join(" | ")}</span>
        )}
        <p>
          {movie.vote_average}/10 ({movie.vote_count} ratings)
        </p>
        <div className="links">
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}/parentalguide`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {/* <button className="button-grey">Parental Guide</button> */}
            <Button text="Parental Guide" />
          </a>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}/reviews`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {/* <button className="button-grey">Parental Guide</button> */}
            <Button text="Reviews" />
          </a>
        </div>
      </div>
    );
  };
  return (
    <div className="flex-view">
      {_map(movies, (movie, index) => {
        return (
          <div key={index}>
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              style={{
                display: movie.poster_path === null ? "none" : "block",
              }}
            />
            {renderInfo(movie)}
          </div>
        );
      })}
    </div>
  );
};

export default MovieFlexView;
