import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchData = async () => {
      const detailsRes = await tmdb.get(`/movie/${movie.id}`);
      setDetails(detailsRes.data);

      const videoRes = await tmdb.get(`/movie/${movie.id}/videos`);
      const vid = videoRes.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(vid?.key);
    };

    fetchData();
  }, [movie]);

  if (!details) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h1>{details.title}</h1>
        <p>{details.overview}</p>
        <p>⭐ {details.vote_average}</p>

        {trailer && (
          <iframe
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Trailer"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

export default MovieModal;
