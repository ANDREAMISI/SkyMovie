import React, { useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const fetchTrailer = async () => {
    if (trailerKey) return;

    const res = await tmdb.get(`/movie/${movie.id}/videos`);
    const trailer = res.data.results.find(
      vid => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (trailer) setTrailerKey(trailer.key);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={() => {
        fetchTrailer();
        setShowTrailer(true);
      }}
      onMouseLeave={() => setShowTrailer(false)}
    >
      {!showTrailer && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      {showTrailer && trailerKey && (
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          allow="autoplay"
          title={movie.title}
        />
      )}
    </div>
  );
}

export default MovieCard;
