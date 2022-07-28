import React from "react";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        alt=""
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        style={{
          display: movie.poster_path === null ? "none" : "block",
          width: "20rem",
        }}
      />
      <div className="info">
        <h4>{movie.title + " "}</h4>
        <div className="movie-information">
          <p>
            {movie.overview.length > 250
              ? movie.overview.substring(0, 250) + "..."
              : movie.overview}
          </p>
          <div className="genres">
            {movie.genres === undefined || movie.genres.length === 0 ? (
              ""
            ) : (
              <span>
                {movie.genres?.map((genre) => genre.name).join(" | ")}
              </span>
            )}
          </div>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}/parentalguide`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button className="button-grey">Parental Guide</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
