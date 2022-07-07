import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Movie.scss";
const movieData = require("./movies.json");

export function Movie() {
  const [movie, setMovie] = useState({});

  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movieData.length);
    const movieId = movieData[randomIndex].tmdbId;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_dbKey}&language=en-US`
      )
      .then(({ data }) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRandomMovie();
    return () => {};
  }, []);

  return (
    <div>
      <div className="overlay">
        <div className="background">
          <img
            alt=""
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            className="backgroundImage"
            style={{
              display: movie.backdrop_path === null ? "none" : "block",
            }}
            // onError={() =>
            //   (document.querySelector(".backgroundImage").style.display =
            //     "none")
            // }
          />
        </div>
      </div>
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
              onClick={() => getRandomMovie()}
            >
              Show me another
            </button>
          </div>
        </div>
      </div>
      <div className="attribution">Powered by the TMDB API</div>
    </div>
  );
}
