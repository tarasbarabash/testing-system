import "../../styles/scss/main.scss";
import React, { Component, useState, useEffect } from "react";
import MainContent from "./MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { auth } from "../models/Auth";
import Loading from "./Loading";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  const setDocumentTitle = title => {
    if (title) document.title = `${title} | TestMaster`;
  };

  useEffect(() => {
    async function checkAuth() {
      await auth.isAuthenticated();
      setLoading(false);
      setDone(true);
    }
    checkAuth();
  }, []);

  return (
    <CommonContext.Provider
      value={{
        setLoading,
        setDocumentTitle
      }}
    >
      <Router basename={process.env.BASE_URL}>
        <Loading className={loading ? "fadeIn" : "fadeOut"} />
        {done && <MainContent />}
      </Router>
    </CommonContext.Provider>
  );
};

export default App;

export const CommonContext = React.createContext({});
