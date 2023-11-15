import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";
import logo from "../../assets/eye-logo.png";
import { selectWatchlistTotalItems } from "../../store/watchlistSlice";

const Header = () => {
  const watchlistTotalItems = useSelector(selectWatchlistTotalItems);

  return (
    <div className="header">
      <div className="header__logo-container">
        <NavLink className="header__link" to="/">
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
          <NavLink className="header__link" to="/movies">
            Movies
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink className="header__link" to="/tvshows">
            Tv Shows
          </NavLink>
        </li>
        <li className="header__li">
          <NavLink
            className="header__link header__link--watchlist-container"
            to="/watchlist"
          >
            {watchlistTotalItems > 0 ? (
              <>
                <p className="header__item-watch">Watchlist</p>
                <span className="header__item">
                  {watchlistTotalItems}
                  <span className="header__emoji">🎥</span>
                </span>
              
              </>
            ) : (
              <p className="header__text">Watchlist</p>
            )}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
