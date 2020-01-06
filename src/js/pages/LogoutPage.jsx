import React, { Component, useContext } from "react";
import { LoadingContext } from "../models/Contexts";
import { auth } from "../models/Auth";
import { Redirect } from "react-router-dom";

class LogoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }

  componentDidMount() {
    this.props.setIsLoading(true);
    auth.logout().then(result => {
      if (result) this.setState({ out: true });
      else this.setState({ out: false });
      this.setState({ done: true });
      this.props.setIsLoading(false);
    });
  }

  render() {
    if (this.state.done)
      return <Redirect to={this.state.out ? "/" : "/dashboard"}></Redirect>;
    else return <div>Logout</div>;
  }
}

export default LogoutPage;
