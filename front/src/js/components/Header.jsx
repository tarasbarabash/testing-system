import React, { useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../components/Logo";
import "../../styles/scss/header.scss";
import { auth } from "../models/Auth";
import ProtectedContent from "./ProtectedContent";

const Header = ({ history }) => {
  const toggleRef = useRef();

  useEffect(
    history.listen(() => {
      if (toggleRef.current) toggleRef.current.checked = false;
    }),
    [history.path]
  );

  return (
    <React.Fragment>
      <header>
        <Logo />
        <div className="sections">
          <div className="left-section">
            <nav>
              <input id="menu-toggle" type="checkbox" ref={toggleRef} />
              <label className="menu-button-container" htmlFor="menu-toggle">
                <div className="menu-button"></div>
              </label>
              <ul className="nav-list">
                <ProtectedContent>
                  <li className="nav-item">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/quizzes">Quizzes</Link>
                  </li>
                </ProtectedContent>
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
          <ProtectedContent>
            <div className="right-section">
              <nav>
                <ul className="nav-list">
                  <li className="nav-item no-effects">
                    <span className="muted">Welcome back,</span>
                    <br></br>
                    {auth.user && auth.user.username}!
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
          </ProtectedContent>
        </div>
      </header>
    </React.Fragment>
  );
};

export default withRouter(Header);
