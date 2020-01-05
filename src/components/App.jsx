import "../styles/scss/main.scss";
import React from "react";
import MainContent from "./MainContent";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <React.Fragment>
    <Router basename="/testing-system-front">
      <MainContent />
    </Router>
  </React.Fragment>
);

export default App;
