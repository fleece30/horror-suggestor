import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Containers/Home/Home";
import { Movie } from "./Containers/Movie/Movie";
import SimilarMovies from "./Containers/SimilarMovies/SimilarMovies";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="randommovies" element={<Movie />} />
        <Route path="searchsimilar" element={<SimilarMovies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
