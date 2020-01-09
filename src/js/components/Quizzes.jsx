import React, { Component } from "react";
import Request from "../models/Request";

class Quizzes extends Component {
  async componentDidMount() {
    this.props.setIsLoading(true);
    const quizzes = await Request.call({
      link: "/quiz",
      reqMethod: "GET"
    });
    console.log(quizzes);
    this.props.setIsLoading(false);
  }
  render() {
    return <div>Quizzes</div>;
  }
}

export default Quizzes;
