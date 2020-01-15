import React, { useContext } from "react";
import CircleChart from "../components/CircleChart";
import { Link } from "react-router-dom";
import PageWithList from "../components/NetworkPageWithList";
import { CommonContext } from "../components/App";

const DashboardPage = () => {
  const { setLoading } = useContext(CommonContext);

  const sortingFields = [
    {
      displayName: "Time",
      name: "time"
    },
    {
      displayName: "Name",
      name: "name"
    },
    {
      displayName: "Points",
      name: "points"
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
    }
  ];
  return (
    <PageWithList
      link="/user/quizzesResults"
      method="GET"
      title="Quiz Results"
      sort="time"
      item={ResultItem}
      setIsLoading={setLoading}
      noResultText="You have not taken any quizzes yet!"
      sortFields={sortingFields}
      filterFields={filterFields}
      initialFilter={{ date: "", name: "" }}
    />
  );
};

export default DashboardPage;

const ResultItem = ({ item, index }) => {
  const { quizId, name, points, questions, time } = item;
  const percentage = parseInt((100 * points) / questions);
  return (
    <div className="row">
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

// const RightColumn = ({ lastQuiz: { points, questions, name, quizId } }) => {
//   return (
//     <React.Fragment>
//       <div>ALALAL</div>
//       <div>
//         <h3 className="heading-3">Last test result</h3>
//         <div className="text-center">
//           <CircleChart
//             percentage={(points / questions) * 100}
//             showPercentage={true}
//           />
//           <p>
//             You've scored {points} / {questions} points.
//           </p>
//           <Link className="heading-3 link" to={`/quiz/${quizId}`}>
//             {name}
//           </Link>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };
