import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../../styles/scss/footer.scss";

const Footer = () => {
  return (
    <footer className="center with-radius">
      <div className="container">
        <div className="row">
          <div className="footer-column">
            <h4 className="heading-5 footer-title">Quizzes</h4>
            <ul className="footer-items">
              <li className="footer-item">
                <Link to="/quizzes">Take a quiz</Link>
              </li>
              <li className="footer-item">
                <Link to="/quiz/new">Create new quiz</Link>
              </li>
              <li className="footer-item">
                <Link to="/dashboard">View results</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="heading-5 footer-title">Features</h4>
            <ul className="footer-items">
              <li className="footer-item">
                <HashLink to="/features#benefits">Benefits</HashLink>
              </li>
              <li className="footer-item">
                <HashLink to="/features#learning">Learning</HashLink>
              </li>
              <li className="footer-item">
                <HashLink to="/features#tracking">Tracking</HashLink>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="heading-5 footer-title">Customers</h4>
            <ul className="footer-items">
              <li className="footer-item">
                <Link to="/customers">Browse all </Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="heading-5 footer-title">Help</h4>
            <ul className="footer-items">
              <li className="footer-item">
                <Link to="/help">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="heading-5 footer-title">About us</h4>
            <ul className="footer-items">
              <li className="footer-item">
                <HashLink to="/about#whatwedo">What we do</HashLink>
              </li>
              <li className="footer-item">
                <HashLink to="/about#whoweare">Who we are</HashLink>
              </li>
              <li className="footer-item">
                <HashLink to="/about#howwework">How we work</HashLink>
              </li>
              <li className="footer-item">
                <HashLink to="/about#ouroffice">Our office</HashLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="row center">.t.a.b. Solutions, LLC. 2020</div>
      </div>
    </footer>
  );
};

export default Footer;
