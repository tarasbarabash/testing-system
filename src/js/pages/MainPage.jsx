import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainPage = props => {
  return (
    <div className="card">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default MainPage;
