import "../../styles/scss/main.scss";
import React, { Component } from "react";
import MainContent from "./MainContent";
import { BrowserRouter as Router } from "react-router-dom";
import { auth } from "../models/Auth";
import Loading from "./Loading";
import { LoadingContext } from "../models/Contexts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      done: false
    };
  }

  setIsLoading = value => this.setState({ loading: value });

  async componentDidMount() {
    await auth.isAuthenticated().then(() => {
      setTimeout(() => {
        this.setState({ loading: false, done: true });
      }, 0);
    });
  }

  render() {
    const { loading: isLoading, done } = this.state;
    return (
      <LoadingContext.Provider value={this.setIsLoading}>
        <Router basename={process.env.BASE_URL}>
          {isLoading && <Loading />}
          {done && <MainContent />}
        </Router>
      </LoadingContext.Provider>
    );
  }
}

export default App;
