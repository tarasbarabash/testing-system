import "../../styles/scss/main.scss";
import React, { Component } from "react";
import MainContent from "./MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { auth } from "../models/Auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    auth.isAuthenticated().then(() => {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 0);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Router basename={process.env.BASE_URL}>
          <MainContent loading={this.state.loading} />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
