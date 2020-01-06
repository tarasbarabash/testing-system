import React from "react";
import "../../styles/scss/logo.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <h2>🎓 TestMaster</h2>
    </Link>
  );
};

export default Logo;
