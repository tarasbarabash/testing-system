import CircleChart from "../components/CircleChart";
import { Link } from "react-router-dom";
import React from "react";

const ResultItem = ({ item, index }) => {
  const { quizId, name, points, questions, time } = item;
  const percentage = parseInt((100 * points) / questions);
  return (
    <div className="row item-row">
      <div className="index text-center">{index + 1}.</div>
      <div className="quiz-name">
        <Link className="link heading-3" to={`/quiz/${quizId}`}>
          {name}
        </Link>
      </div>
      <div className="details column">
        <div className="row text-center">
          <div className="column">
            <span className="muted">Score </span>
            <div className="points">
              {points} / {questions}
            </div>
          </div>
          <CircleChart
            percentage={percentage}
            className="no-animation"
            height="60px"
            showPercentage={true}
          />
        </div>
        <div className="time muted">
          {new Date(time).toLocaleString("uk-UA")}
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
