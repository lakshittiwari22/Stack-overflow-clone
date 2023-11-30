import React from "react";
import Questions from "./Questions";

const QuestionList = ({ questionsList }) => {
  return (
    <>
      {questionsList.slice().reverse().map((question) => (
        <Questions question={question} key={question._id} />
      ))}
    </>
  );
};

export default QuestionList;
