import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainPage = props => {
  return (
    <React.Fragment>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </React.Fragment>
  );
};

export default MainPage;
