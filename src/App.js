import { Home } from "./Containers/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Movie } from "./Containers/Movie";
import "./App.css";
import SimilarMovies from "./Containers/SimilarMovies";

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
