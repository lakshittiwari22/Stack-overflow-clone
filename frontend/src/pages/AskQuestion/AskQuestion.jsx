import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import "./askquestion.css";
import { AskPublicQuestion } from "../../actions/question";
import TextEditor from "../../components/RichTextEditor/TextEditor";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const navigate = useNavigate();

  const handleEditorChange = (content) => {
    setEditorValue(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmptyAnswer = /^(\s*|<p>\s*<\/p>)$/.test(editorValue);
    if (User) {
      if (questionTitle && !isEmptyAnswer && questionTags) {
        dispatch(
          AskPublicQuestion(
            {
              questionTitle,
              questionBody: editorValue,
              questionTags,
              userPosted: User.result.name,
              userId: User.result._id,
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>

        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you're asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>

              <TextEditor onContentChange={handleEditorChange} />
            </label>

            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Review your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
