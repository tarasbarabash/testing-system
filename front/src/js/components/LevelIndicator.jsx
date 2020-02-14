import React from "react";
import "../../styles/scss/dots.scss";

const Level = ({ complexity }) => {
  const dots = [];
  for (let i = 0; i < complexity; i++) {
    dots.push(<span key={i} className="dot"></span>);
  }
  return <div className="dots">{dots}</div>;
};

export default Level;
