import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/eye-logo.png";
// import { useWatchListSelector } from "../Redux/hooks";

const Header = () => {
//   const watchlistItemNumber = useWatchListSelector((state) =>
//   state.watchlist.items.reduce((val, item) => val + item.quantity, 0)
// );
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
          <NavLink className="header__link" to="/watchlist">
            Watchlist
          </NavLink>
        </li>
        {/* <li><p>{watchlistItemNumber}</p></li> */}
      </ul>
    </div>
  );
};

export default Header;
