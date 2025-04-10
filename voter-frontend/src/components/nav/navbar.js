import React from "react";
import { Link } from "react-router-dom";
import eciLogo from "../images/eci-logo.svg"; // Import the image
import home from "../images/home-button.png";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={eciLogo} alt="ECI Logo" className="logo" />
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <div className="navbar-buttons">
        <Link to="/" className="button"><img src={home} alt="home" className="home-btn" />
        </Link>
        <Link to="/register">
          <button className="nav-btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="nav-btn login-btn">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
