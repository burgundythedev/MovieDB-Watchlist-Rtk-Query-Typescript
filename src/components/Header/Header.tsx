import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import watchLogo from "../../assets/watchlist-logo.svg";
import "./Header.scss";
import logo from "../../assets/eye-logo.png";
import { selectWatchlistTotalItems } from "../../store/watchlistSlice";

const Header = () => {
  const totalItems = useSelector(selectWatchlistTotalItems);
  const [selectedLink, setSelectedLink] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const handleScroll = () => {

    setIsScrolled(window.scrollY > 300);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header__logo-container">
        <NavLink className="header__link header__link--logo" to="/">
          <img className="header__logo" src={logo} alt="logo-pic" />
          <p className="header__title">eyeforaScreen</p>
        </NavLink>
      </div>
      <ul className="header__menu">
        {windowWidth >= 1000 && (
          <li className="header__li">
            <NavLink
              className={`header__link ${
                selectedLink === "home" ? "underline" : ""
              }`}
              to="/"
              onClick={() => handleLinkClick("home")}
            >
              Home
            </NavLink>
          </li>
        )}
        <li className="header__li">
          <NavLink
            className={`header__link ${
              selectedLink === "about" ? "underline" : ""
            }`}
            to="/upcoming-movies"
            onClick={() => handleLinkClick("about")}
          >
            Upcoming Movies
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink
            className={`header__link ${
              selectedLink === "movies" ? "underline" : ""
            }`}
            to="/movies"
            onClick={() => handleLinkClick("movies")}
          >
            Movies
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink
            className={`header__link ${
              selectedLink === "tvshows" ? "underline" : ""
            }`}
            to="/tvshows"
            onClick={() => handleLinkClick("tvshows")}
          >
            TV Series
          </NavLink>
        </li>
      </ul>
      <div className="header__watchlist-container">
        <NavLink
          className={`header__link header__link--watchlist ${
            selectedLink === "watchlist" ? "underline" : ""
          }`}
          to="/watchlist"
          onClick={() => handleLinkClick("watchlist")}
        >
          <p className="header__total">{totalItems}</p>
          <img
            className="header__logo header__logo--watch"
            src={watchLogo}
            alt="watchlist-icon"
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
