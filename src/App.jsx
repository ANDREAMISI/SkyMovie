import "./App.css";
import Header from "./components/Header/Header";
import MovieRow from "./components/MovieRow/MovieRow";
import ActorsHero from "./components/ActorsHero/ActorsHero";
import React, { useState, useEffect } from "react";
import { tmdb } from "./services/tmdb";

function App() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await tmdb.get("/search/movie", {
          params: { query: search }
        });
        setSearchResults(res.data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [search]);

  return (
    <>
      <Header setSearch={setSearch} />
      <ActorsHero />

      {/* Recherche active */}
      {search && (
        <MovieRow
          title={`Results for "${search}"`}
          movies={searchResults}
          loading={loading}
        />
      )}

      {/* Navigation normale */}
      {!search && (
        <>
          <MovieRow title="Popular Movies" fetchUrl="popular" />
          <MovieRow title="Top Rated" fetchUrl="topRated" />
          <MovieRow title="Upcoming" fetchUrl="upcoming" />
        </>
      )}
    </>
  );
}

export default App;