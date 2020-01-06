import React from "react";
import "../../styles/scss/landing.scss";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const LandingPage = ({ children }) => {
  return (
    <React.Fragment>
      <main className="center">
        <div className="container">
          <Logo />
          <div className="card full-width center">{children}</div>
        </div>
      </main>
      <footer className="footer">
        <p>.t.a.b. Solutions, LLC. {new Date().getFullYear()}</p>
        <ul className="row">
          <li className="item">
            <Link to="/about">About us</Link>
          </li>
          <li className="item">
            <Link to="/features">Features</Link>
          </li>
          <li className="item">
            <Link to="/customers">Customers</Link>
          </li>
          <li className="item">
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </footer>
    </React.Fragment>
  );
};

export default LandingPage;
