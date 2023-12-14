import { NavLink } from "react-router-dom";
import "./Footer.scss";
import logo from "../../assets/eye-logo.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
const Footer = () => {
  return (
    <div className="footer">
       <div className="footer__divided"></div>
      <div className="footer__wrapper">
        <div className="footer__logo-box">
          <div className="footer__link">
            <div className="footer__dev">
              <img className="footer__logo" src={logo} alt="logo-pic" />
              <p className="footer__title">eyeforaScreen</p>
              <p className="footer__text">
                <span className="footer__span">@2023 burgundythev,</span>All Rights Reserved
              </p>
            </div>
          </div>
          <div className="footer__icon-container">
            <NavLink to={"https://www.instagram.com/"} className="footer__link">
              <img className="footer__icon" src={instagram} alt="logo-pic" />
            </NavLink>
            <NavLink to={"https://www.linkedin.com/in/olivier-bourgogne/"} className="footer__link">
              <img className="footer__icon" src={linkedin} alt="logo-pic" />
            </NavLink>
            <NavLink to={"https://twitter.com/KeusKulte"} className="footer__link">
              <img className="footer__icon" src={twitter} alt="logo-pic" />
            </NavLink>
            <NavLink to={"https://github.com/burgundythedev"} className="footer__link">
              <img className="footer__icon" src={github} alt="logo-pic" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
