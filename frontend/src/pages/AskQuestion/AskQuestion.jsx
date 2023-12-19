import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./askquestion.css";
import { AskPublicQuestion } from "../../actions/question";

const AskQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [quillValue, setQuillValue] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && quillValue && questionTags) {
        dispatch(
          AskPublicQuestion(
            {
              questionTitle,
              questionBody: quillValue,
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

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["image"],
      ["video"],
      [ "code-block" ],
      [ "code"],
      ["clean"],
      
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code-block",
    "clean",
    'code'
  ];

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
              <ReactQuill
                theme="snow"
                
                // value={questionBody}

                value={quillValue}
                onChange={(value) => setQuillValue(value)}
                modules={modules}
                formats={formats}
                dangerouslySetInnerHTML={{ __html: quillValue }}
              />

              {/* <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                onKeyDown={handleEnter}
                cols="30"
                rows="10"
              ></textarea> */}
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
