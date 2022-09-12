import React, { useEffect, useRef, useState } from "react";
import _map from "lodash/map";
import _uniqueId from "lodash/uniqueId";
import withState from "../../Containers/withState/withState";
import { LIKE_TREE_ACTIONS_TYPES } from "./LikeTree.constant";
import LIKE_TREE_ACTIONS from "./LikeTree.action";
import MovieCard from "../MovieCard/MovieCard";
import MovieFlexView from "../MovieFlexView/MovieFlexView";
import Loader from "../Loader/Loader";
import { Button } from "../Button/Button";

import "./LikeTree.scss";

const LikeTree = (props) => {
  const { movieDetails, isLoaded = false, onAction } = props;
  const numberOfResults = useRef(16);
  // const [seenMovies, setSeenMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RANDOM_MOVIE_IDS);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getSuggestions = (movieId) => {
    numberOfResults.current = Math.floor(numberOfResults.current / 2);
    onAction(LIKE_TREE_ACTIONS_TYPES.FETCH_RECOMMENDATIONS_ACTION, {
      movieId,
      expectedLength: numberOfResults.current,
      // seenMovies,
    });
    // setSeenMovies([...seenMovies, ...movieDetails]);
  };

  const renderPlaylistButton = () => {
    return (
      <div
        style={{
          display: movieDetails.length === 1 ? "flex" : "none",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <Button
          text={"Your Playlist"}
          onClick={() => {
            // setSeenMovies([...seenMovies, ...movieDetails]);
            setSelectedMovies([...selectedMovies, movieDetails[0]]);
            setShowCarousel(true);
          }}
        />
      </div>
    );
  };

  const renderMovies = () => {
    return (
      <div className="selected-movies">
        {_map(movieDetails, (movie, index) => {
          return (
            <div
              key={_uniqueId()}
              className="movie-item"
              style={{
                pointerEvents: movieDetails.length === 1 ? "none" : "auto",
              }}
              onClick={() => {
                // addIndexToState(index);
                setSelectedMovies([...selectedMovies, movie]);
                getSuggestions(movie.id);
              }}
            >
              <MovieCard movie={movie} index={index} showGuide={false} />
            </div>
          );
        })}
      </div>
    );
  };

  const renderCards = () => {
    return (
      <div>
        {renderMovies()}
        {renderPlaylistButton()}
        {showCarousel ? <MovieFlexView movies={selectedMovies} /> : null}
      </div>
    );
  };

  return isLoaded ? renderCards() : <Loader />;
};

export default withState(LikeTree, LIKE_TREE_ACTIONS);
