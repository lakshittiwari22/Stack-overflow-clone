import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./homemainbar.css";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";

const HomeMainBar = () => {
  // var questionsList = [
  //   {
  //     _id: 1,
  //     upVotes: 3,
  //     downVotes: 2,
  //     no0fAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongoDB"],
  //     userId: 1,
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },

  //   {
  //     _id: 2,
  //     upVotes: 3,
  //     downVotes: 2,
  //     no0fAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userId: 1,
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },

  //   {
  //     _id: 3,
  //     votes: 1,
  //     no0fAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userId: 1,
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];

  const user = 1;

  const navigate = useNavigate();

  const location = useLocation();

  const questionsList = useSelector(state => state.questionsReducer)
  

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask aquestion");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}

        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <>
              <QuestionList questionsList={questionsList.data} />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
