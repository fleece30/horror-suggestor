import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Components/Home/Home";
import Movie from './Components/Movie/Movie';
import SimilarMovies from "./Components/SimilarMovies/SimilarMovies";

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
