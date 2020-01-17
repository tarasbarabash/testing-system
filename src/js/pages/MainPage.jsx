import React, { useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CommonContext } from "../components/App";

const MainPage = ({ children, title }) => {
  const { setDocumentTitle: setTitle } = useContext(CommonContext);
  setTitle(title);
  return (
    <div className="card full-size">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainPage;
