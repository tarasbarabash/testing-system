import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "../../styles/scss/header.scss";
import { auth } from "../models/Auth";

const Header = () => {
  return (
    <header>
      <div className="left-section">
        <div className="logo-wrapper">
          <Logo className="no-padding" />
        </div>
        <nav>
          <input id="menu-toggle" type="checkbox" />
          <label className="menu-button-container" htmlFor="menu-toggle">
            <div className="menu-button"></div>
          </label>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/quizzes">Quizzes</Link>
            </li>
            <li className="nav-item">
              <Link to="/features">Features</Link>
            </li>
            <li className="nav-item">
              <Link to="/customers">Customers</Link>
            </li>
            <li className="nav-item">
              <Link to="/help">Help</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div></div>
      <div className="right-section">
        <nav>
          <ul className="nav-list">
            <li>
              <span className="muted">Welcome back,</span>
              <br></br>
              {auth.user.username}!
              <div className="dropdown">
                <ul className="column sub-list">
                  <li className="nav-item">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
