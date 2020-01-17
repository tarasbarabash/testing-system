import React, { useContext } from "react";
import PageWithList from "../components/NetworkPageWithList";
import { CommonContext } from "../components/App";
import ResultItem from "../components/ResultItem";

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
