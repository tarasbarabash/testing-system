import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import request from "../models/Request";
import { CommonContext } from "../components/App";
import Level from "../components/LevelIndicator";
import ResultItem from "../components/ResultItem";
import CircleChart from "../components/CircleChart";

const QuizPage = () => {
  const { id } = useParams();
  const { setLoading, setDocumentTitle: setTitle } = useContext(CommonContext);
  const [quiz, setQuiz] = useState();
  const [results, setResults] = useState();
  useEffect(() => {
    async function getQuizInfo() {
      const { resp: quizInfo, lastResult, bestResults } = await loadQuizInfo(
        id,
        setLoading
      );
      setQuiz(quizInfo);
      setResults({
        total: lastResult.total,
        lastResult: lastResult.data[0],
        bestResults: bestResults.data
      });
      setTitle(`Quiz: ${quizInfo.name}`);
    }
    getQuizInfo();
  }, []);

  const renderResults = () => {
    return (
      <div className="list stripped">
        {results.bestResults.map((item, index) => (
          <ResultItem key={index} item={item} index={index} />
        ))}
      </div>
    );
  };

  const rightSectionContent = () => (
    <React.Fragment>
      {results.lastResult ? (
        <React.Fragment>
          <h3 className="heading-3">Last result:</h3>
          <CircleChart
            percentage={
              (results.lastResult.points / quiz.questions.length) * 100
            }
            showPercentage={true}
          />
        </React.Fragment>
      ) : (
        <p className="muted center">You haven't taken this quiz yet!</p>
      )}
      {!quiz.attempts || (quiz.attempts && quiz.attempts > results.total) ? (
        <div className="row">
          <Link to={`/test/${id}`} className="btn action without-margin">
            Take A Quiz!
          </Link>
        </div>
      ) : (
        <p className="muted">You've used all {quiz.attempts} attempts!</p>
      )}
    </React.Fragment>
  );

  if (quiz && results)
    return (
      <div className="root">
        <section className="left-column">
          <div className="row header center">
            <div>
              <h3 className="heading-3">{quiz.name}</h3>
              <p className="muted">{quiz.questions.length} questions</p>
            </div>
            <div className="column items-end">
              <Level complexity={quiz.complexity} />
              <p className="muted">Level: {quiz.complexity}</p>
            </div>
          </div>
          <div className="row header">
            <div className="muted">
              Time: {!quiz.timer ? "∞" : durationToString(quiz.timer)}
            </div>
            <div className="muted">Created by: {quiz.creator.name}</div>
          </div>
          {quiz.description && <p>{quiz.description}</p>}
          {results.bestResults.length > 0 && (
            <div>
              <h3 className="heading-3">Best results:</h3>
              {renderResults()}
            </div>
          )}
          <div className="center">
            {!results.lastResult && rightSectionContent()}
          </div>
        </section>
        {results.lastResult && (
          <section className="right-column items-center">
            {rightSectionContent()}
          </section>
        )}
      </div>
    );
  else return <div>Loading...</div>;
};

const loadQuizInfo = async (id, setLoading) => {
  setLoading(true);
  const resp = await request.call({ reqMethod: "GET", link: `/quiz/${id}` });
  const lastResult = await request.call({
    reqMethod: "GET",
    link: `/user/quizzesResults?quizId=${id}&sort=time&limit=1`
  });
  const bestResults = await request.call({
    reqMethod: "GET",
    link: `/user/quizzesResults?quizId=${id}&sort=points&limit=3`
  });
  setLoading(false);
  return { resp, lastResult, bestResults };
};

const durationToString = duration => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

export default QuizPage;
