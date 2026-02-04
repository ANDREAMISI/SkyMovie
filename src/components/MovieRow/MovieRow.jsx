import React, { useEffect, useState, useRef } from "react";
import { tmdb, requests } from "../../services/tmdb";
import MovieCard from "../MovieCard/MovieCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./MovieRow.css";

function MovieRow({ title, fetchUrl, movies = [] }) {
  const [rowMovies, setRowMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const rowRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        //films passés depuis le parent (search)
        if (Array.isArray(movies) && movies.length > 0) {
          if (isMounted) setRowMovies(movies);
          return;
        }

        //films depuis TMDB (catégories)
        if (fetchUrl && requests[fetchUrl]) {
          const res = await tmdb.get(requests[fetchUrl]);
          if (isMounted) {
            setRowMovies(res.data.results || []);
          }
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Impossible de charger les films");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadMovies();

    return () => {
      isMounted = false;
    };
  }, [movies, fetchUrl]);

  //Scroll horizontal
  const scroll = (direction) => {
    if (!rowRef.current) return;

    const scrollAmount = direction === "left" ? -500 : 500;

    rowRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  //Rien à afficher
  if (!rowMovies.length && !isLoading) return null;

  return (
    <section className="movie-row">
      <h2>{title}</h2>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="row-wrapper">
        {/*Bouton gauche */}
        <button
          className="scroll-btn left"
          onClick={() => scroll("left")}
        >
          <FaChevronLeft />
        </button>

        {/*Films */}
        <div className="row-posters" ref={rowRef}>
          {rowMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Bouton droit */}
        <button
          className="scroll-btn right"
          onClick={() => scroll("right")}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
