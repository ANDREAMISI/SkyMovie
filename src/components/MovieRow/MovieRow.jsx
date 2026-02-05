import React, { useEffect, useState, useRef } from "react";
import { tmdb, requests } from "../../services/tmdb";
import MovieCard from "../MovieCard/MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MovieRow.css";

function MovieRow({ title, fetchUrl, movies, onSelectMovie }) {
  const [rowMovies, setRowMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const rowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (Array.isArray(movies)) {
          if (isMounted) setRowMovies(movies);
          return;
        }

        if (fetchUrl && requests[fetchUrl]) {
          const res = await tmdb.get(requests[fetchUrl]);
          if (isMounted) setRowMovies(res.data.results || []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Impossible de charger les films");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMovies();
    return () => (isMounted = false);
  }, [fetchUrl, movies]);

  const scroll = (direction) => {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  if (!rowMovies.length && !isLoading) return null;

  return (
    <section className="movie-row">
      <h2>{title}</h2>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="row-wrapper">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>

        <div className="row-posters" ref={rowRef}>
          {rowMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => onSelectMovie(movie)}
            />
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
