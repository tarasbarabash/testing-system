import React, { useContext } from "react";
import NetworkPageWithList from "../components/NetworkPageWithList";
import { Link } from "react-router-dom";
import Level from "../components/LevelIndicator";
import { CommonContext } from "../components/App";

const QuizzesPage = () => {
  const { setLoading } = useContext(CommonContext);

  const sortingFields = [
    {
      displayName: "Level",
      name: "complexity"
    },
    {
      displayName: "Name",
      name: "name"
    },
    {
      displayName: "Questions",
      name: "questions"
    },
    {
      displayName: "Time",
      name: "time"
    }
  ];
  const filterFields = [
    {
      name: "date",
      displayName: "Date",
      inputType: "date"
    },
    {
      name: "name",
      displayName: "Quiz Name",
      inputType: "text"
    },
    {
      name: "complexity",
      displayName: "Level",
      inputType: "number"
    },
    {
      name: "questionNumb",
      displayName: "Number of questions",
      inputType: "number"
    }
  ];
  return (
    <NetworkPageWithList
      link="/quiz"
      method="GET"
      title="Quizzes"
      sort="time"
      item={ResultItem}
      setIsLoading={setLoading}
      noResultText="You have not taken any quizzes yet!"
      sortFields={sortingFields}
      filterFields={filterFields}
      initialFilter={{ date: "", name: "", complexity: "", questionNumb: "" }}
    />
  );
};

const ResultItem = ({
  index,
  item: {
    time,
    _id: quizId,
    name,
    description,
    questions,
    creatorInfo: { name: creatorName },
    complexity
  }
}) => {
  return (
    <div className="row item-row">
      <div className="index text-center">{index + 1}.</div>
      <div className="quiz-name">
        <Link className="link heading-3" to={`/quiz/${quizId}`}>
          {name}
        </Link>
        <p className="muted description">{description}</p>
        <p className="muted questions-number">{questions} questions</p>
      </div>
      <div className="details column">
        <p className="muted">Created by {creatorName}</p>
        <p className="muted">on {new Date(time).toLocaleString("uk-UA")}</p>
        <Level complexity={complexity} />
        <p className="muted">Level: {complexity}</p>
      </div>
    </div>
  );
};

export default QuizzesPage;
