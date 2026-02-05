import "./App.css";
import Header from "./components/Header/Header";
import MovieModal from "./components/MovieModal/MovieModal";
import React, { useState } from "react";
import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import People from "./pages/People";

function App() {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <Header setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              onSelectMovie={setSelectedMovie}
            />
          }
        />

        <Route
          path="/movies"
          element={<Movies onSelectMovie={setSelectedMovie} />}
        />

        <Route
          path="/tv"
          element={<TVShows />}
        />

        <Route
          path="/people"
          element={<People />}
        />
      </Routes>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
