import React, { useEffect, useState, useContext, useRef } from "react";
import Request from "../models/Request";
import { useParams, Redirect } from "react-router-dom";
import AuthError from "../errors/AuthError";
import { CommonContext } from "../components/App";
import CircleChart from "../components/CircleChart";
import "../../styles/scss/test.scss";
import { durationToString } from "./QuizPage";

const TestPage = () => {
  const { id: quizId } = useParams();
  const { setLoading, setDocumentTitle: setTitle } = useContext(CommonContext);
  const [restricted, setRestricted] = useState(false);
  const [done, setDone] = useState(false);
  const [qIndex, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({
    questions: []
  });
  const [resultId, setResultId] = useState("");
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { quiz: resultQuiz, resultId } = await Request.call({
          reqMethod: "GET",
          link: `/quiz/${quizId}/attempt`
        });
        resultQuiz.questions.sort(() => Math.random() - 0.5);
        resultQuiz.questions.forEach(i =>
          i.options.sort(() => Math.random() - 0.5)
        );
        setQuiz(resultQuiz);
        setResultId(resultId);
        setTimer(resultQuiz.timer);
        setTitle(`Testing: ${resultQuiz.name}`);
      } catch (e) {
        if (e instanceof AuthError) setRestricted(true);
        console.log(e);
      }
      setLoading(false);
    }
    load();
  }, []);

  useInterval(
    () => {
      if (timer > 0) setTimer(timer - 1000);
      else {
        setTimer(-1);
        onFinish();
      }
    },
    timer >= 0 ? 1000 : null
  );

  const onFinish = async () => {
    setLoading(true);
    const result = await Request.call({
      reqMethod: "POST",
      link: `/quiz/${quizId}/check`,
      data: {
        prevResultId: resultId,
        selectedOptions: answers
      }
    });
    if (result.correct >= 0) setDone(true);
    setLoading(false);
  };

  if (!restricted && !done)
    return (
      <div className="root">
        <section className="left-column">
          <QuestionView
            questions={quiz.questions}
            index={qIndex}
            setQuestion={setIndex}
            answers={{ answers, setAnswers }}
            timer={timer}
            onFinish={onFinish}
          />
        </section>
        <section className="right-column">
          <div className="questions">
            <QuestionsNavigator
              questions={quiz.questions}
              setQuestion={setIndex}
              answers={answers}
            />
          </div>
        </section>
      </div>
    );
  else return <Redirect to={`/quiz/${quizId}`} />;
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default TestPage;

const QuestionView = ({
  questions,
  index,
  setQuestion,
  answers: { answers, setAnswers },
  timer,
  onFinish
}) => {
  if (questions.length <= 0) return <div />;
  const question = questions[index];
  const { title, options, _id: questionId } = question;
  return (
    <React.Fragment>
      <div className="row justify-between">
        <div className="column baseline">
          <p className="muted no-margin">Question:</p>
          <h3 className="heading-4">{title}</h3>
        </div>
        <div className="column">
          <button className="btn action" onClick={() => onFinish()}>
            Finish Quiz
          </button>
          {!isNaN(timer) && (
            <p className="muted">Time Left: {durationToString(timer)}</p>
          )}
        </div>
      </div>
      <h3 className="heading-3">Select correct answer: </h3>
      <div className="with-margin">
        {options.map(({ _id, value }) => (
          <label className="radio-container" key={_id}>
            <p className="main">{value}</p>
            <input
              type="radio"
              name="radio"
              checked={answers[questionId] === _id}
              onChange={() => setAnswers({ ...answers, [questionId]: _id })}
            />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
      <div className="row justify-between">
        <button
          className="btn action with-margin"
          disabled={!(index > 0)}
          onClick={() => setQuestion(index - 1)}
        >
          Previous
        </button>
        <button
          className="btn action with-margin"
          disabled={!(index + 1 < questions.length)}
          onClick={() => setQuestion(index + 1)}
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

const QuestionsNavigator = ({ questions, setQuestion, answers }) => {
  return (
    <div>
      <h3 className="heading-3">Progress:</h3>
      <div className="center">
        <CircleChart
          percentage={(Object.keys(answers).length / questions.length) * 100}
          showPercentage={true}
          className="with-transition"
        />
      </div>
      <h3 className="heading-3">Questions:</h3>
      {questions.map(({ _id, title }, index) => (
        <div
          key={_id}
          className="row question-option"
          onClick={() => setQuestion(index)}
        >
          <div className={`page-index quiz-index ${answers[_id] && "active"}`}>
            {index + 1}
          </div>
          <h3 className="heading-3">{title}</h3>
        </div>
      ))}
    </div>
  );
};
