
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import watchLogo from "../../assets/watchlist-logo.svg";
import "./Header.scss";
import logo from "../../assets/eye-logo.png";
import { selectWatchlistTotalItems } from "../../store/watchlistSlice";

const Header = () => {
  const totalItems = useSelector(selectWatchlistTotalItems);

  return (
    <div className="header">
      <div className="header__logo-container">
        <NavLink className="header__link header__link--logo" to="/">
          <img className="header__logo" src={logo} alt="logo-pic" />
          <p className="header__title">eyeforaScreen</p>
        </NavLink>
      </div>
      <ul className="header__menu">
        <li className="header__li">
          <NavLink className="header__link" to="/">
            Home
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink className="header__link" to="/upcoming-movies">
            Upcoming Movies
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink className="header__link" to="/movies">
            Movies
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink className="header__link" to="/tvshows">
            TV Series
          </NavLink>
        </li>
      </ul>
      <div className="header__watchlist-container">
        <NavLink
          className="header__link header__link--watchlist"
          to="/watchlist"
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
