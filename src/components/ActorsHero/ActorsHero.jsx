import React, { useEffect, useState } from "react";
import { tmdb } from "../../services/tmdb";
import "./ActorsHero.css";

function ActorsHero() {
  const [actors, setActors] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    tmdb.get("/person/popular").then(res => {
      setActors(res.data.results);
    });
  }, []);

  useEffect(() => {
    if (!actors.length) return;

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % actors.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [actors]);

  if (!actors.length) return null;

  const actor = actors[index];

  return (
    <section className="actors-hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${actor.profile_path})`
        }}
      />

      <div className="hero-content">
        <h1>{actor.name}</h1>
        <p>Popularité : ⭐ {actor.popularity.toFixed(1)}</p> 
      </div>
    </section>
  );
}

export default ActorsHero;
