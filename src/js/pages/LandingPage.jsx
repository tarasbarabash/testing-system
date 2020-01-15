import React, { useContext } from "react";
import "../../styles/scss/landing.scss";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import { CommonContext } from "../components/App";

const LandingPage = ({ title, children }) => {
  const { setDocumentTitle: setTitle } = useContext(CommonContext);
  setTitle(title);
  return (
    <React.Fragment>
      <main className="content center">
        <div className="container">
          <div className="content">
            <Logo className="card" />
            <div className="card full-width center">{children}</div>
          </div>
        </div>
      </main>
      <footer className="footer">
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
        <div>.t.a.b. Solutions, LLC. {new Date().getFullYear()}</div>
      </footer>
    </React.Fragment>
  );
};

export default LandingPage;
