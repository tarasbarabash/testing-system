import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../models/Request";
import { CommonContext } from "../components/App";

const QuizPage = () => {
  const { id } = useParams();
  const { setLoading } = useContext(CommonContext);
  const [quiz, setQuiz] = useState({});
  useEffect(() => {
    async function getQuizInfo() {
      const quizInfo = await loadQuizInfo(id, setLoading);
      setQuiz(quizInfo);
    }
    getQuizInfo();
  }, []);
  return <div>{id}</div>;
};

const loadQuizInfo = async (id, setLoading) => {
  setLoading(true);
  const resp = await request.call({ reqMethod: "GET", link: `/quiz/${id}` });
  setLoading(false);
  return resp;
};

export default QuizPage;
