import React, { useEffect } from "react";

import _isEmpty from "lodash/isEmpty";

import withState from "../../Containers/withState/withState";
import MOVIE_ACTIONS from "./Movie.action";
import { MOVIE_ACTIONS_TYPES, strings } from "./Movie.constant";

import "./Movie.scss";

const Movie = (props) => {
  const { movie, onAction } = props;

  useEffect(() => {
    onAction(MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderOverlay = () => {
    return (
      <div className="overlay">
        <div className="background">
          <img
            alt=""
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            className="backgroundImage"
            style={{
              display: movie.backdrop_path === null ? "none" : "block",
            }}
          />
        </div>
      </div>
    );
  };

  const renderMoviePage = () => (
    <div>
      {renderOverlay()}
      <div className="movie-content">
        <img
          alt=""
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          style={{
            display: movie.poster_path === null ? "none" : "block",
            width: "20rem",
          }}
        />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <h3>{movie.release_date}</h3>
          <p>
            From{" "}
            {movie.production_countries === undefined ||
            movie.production_countries.length === 0
              ? ""
              : movie.production_countries[0].name}
          </p>
          {movie.genres === undefined || movie.genres.length === 0
            ? ""
            : movie.genres?.map((genre, key) => {
                return <span key={key}>{genre.name} | </span>;
              })}
          <p>{movie.overview}</p>
          <p>
            {movie.vote_average}/10 ({movie.vote_count} ratings)
          </p>
          <div style={{ display: "flex", columnGap: "1rem" }}>
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}/parentalguide`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button className="button-grey">Parental Guide</button>
            </a>
            <button
              style={{
                background: "transparent",
                color: "#FDFBF9",
              }}
              className="button-grey"
              onClick={() =>
                onAction(MOVIE_ACTIONS_TYPES.FETCH_MOVIE_DATA_ACTION)
              }
            >
              {strings.showAnother}
            </button>
          </div>
        </div>
      </div>
      <div className="attribution">{strings.attribution}</div>
    </div>
  );

  return _isEmpty(movie) ? null : renderMoviePage();
};

export default withState(Movie, MOVIE_ACTIONS);
