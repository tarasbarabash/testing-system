import React from "react";
import "../../styles/scss/loading.scss";
import Logo from "./Logo";

const Loading = () => {
  return (
    <div className="loading">
      <Logo className="card" />
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default Loading;
