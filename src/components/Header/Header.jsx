import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/react.svg";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Header({ setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* Debounce search */
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, setSearch]);

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close menu with ESC + lock scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    const esc = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", esc);

    return () => window.removeEventListener("keydown", esc);
  }, [menuOpen]);

  return (
    <>
      <header className={`app-header ${scrolled ? "scrolled" : ""}`}>
        <img src={logo} alt="Logo" className="logo" />

        {/* Desktop search */}
        <div className="search-container desktop-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <ul>
            {["Home", "Movies", "TV Shows", "People"].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(" ", "")}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile nav */}
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />

        {/* Mobile search */}
        <div className="search-container mobile-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <ul>
          {["Home", "Movies", "TV Shows", "People"].map(item => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(" ", "")}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Header;
