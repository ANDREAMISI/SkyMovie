import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    tmdb.get(`/movie/${movie.id}`).then(res => setDetails(res.data));
    tmdb.get(`/movie/${movie.id}/videos`).then(res => {
      const vid = res.data.results.find(v => v.type === "Trailer");
      setTrailer(vid?.key);
    });
  }, [movie.id]);

  if (!details) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h1>{details.title}</h1>
        <p>{details.overview}</p>
        <p>⭐ {details.vote_average}</p>

        {trailer && (
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
          />
        )}
      </div>
    </div>
  );
}

export default MovieModal;
