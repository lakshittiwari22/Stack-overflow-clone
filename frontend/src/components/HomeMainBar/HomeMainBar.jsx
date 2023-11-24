import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./homemainbar.css";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";

const HomeMainBar = () => {
 

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
          <h1 className="loding">Loading...</h1>
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
