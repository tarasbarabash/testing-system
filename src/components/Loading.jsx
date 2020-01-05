import React from "react";
import "../styles/scss/loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default Loading;
