import React, { Component } from "react";
import Request from "../models/Request";
import "../../styles/scss/two-column-page.scss";
import CircleChart from "./CircleChart";
import { Link } from "react-router-dom";
import ResponsiveTable from "./ResponsiveTable";

class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    this.props.setIsLoading(true);
    const response = await Request.call({
      reqMethod: "GET",
      link: "/user/quizzesResults"
    });
    this.setState({ quizzes: response });
    this.props.setIsLoading(false);
  }

  render() {
    const { quizzes } = this.state;
    if (!quizzes) return <div>You have not taken any quizzes yet!</div>;
    const [lastQuiz] = quizzes;
    return (
      <div className="root">
        <section className="left-column">
          <h3 className="heading-3">Latest results</h3>
          <ResponsiveTable
            headers={[
              "_id",
              "Correct",
              "Quiz Name",
              "quizId",
              "questionsNumb",
              "time"
            ]}
            data={quizzes}
          />
        </section>
        <section className="right-column">
          <RightColumn lastQuiz={lastQuiz} />
        </section>
      </div>
    );
  }
}

const RightColumn = ({ lastQuiz: { points, questions, name, quizId } }) => {
  return (
    <React.Fragment>
      <h3 className="heading-3">Last test result</h3>
      <div className="text-center">
        <CircleChart percentage={(points / questions) * 100} />
        <p>
          You've scored {points} / {questions} points.
        </p>
        <Link className="heading-3 link" to={`/quiz/${quizId}`}>
          {name}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
