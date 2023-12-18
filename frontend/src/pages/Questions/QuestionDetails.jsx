import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import DisplayAnswers from "./DisplayAnswers";
import { useSelector } from "react-redux";

import "./questionspage.css";
import Avatar from "../../components/Avatar/Avatar";

const QuestionDetails = () => {
  const { id } = useParams();
  const User = useSelector((state) => state.currentUserReducer);
  const allUsers = useSelector((state) => state.usersReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState(" ");
  const location = useLocation();

  const url = "https://stack-overflow-clone-22.netlify.app";

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();

    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/");
    } else {
      if (answer === " ") {
        alert("Enter an answer");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
      }
    }
    setAnswer("");
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("copied to clipboard");
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    console.log("clicked");
    dispatch(voteQuestion(id, "upvote", User.result._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downvote", User.result._id));
  };

  const questionsList = useSelector((state) => state.questionsReducer);
  const displayQuestion = questionsList?.data?.filter(
    (question) => question._id === id
  )[0];
  const userQuestioned = allUsers?.filter(
    (user) => user._id === displayQuestion?.userId
  )[0];

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        className="votes-icon"
                        onClick={handleUpVote}
                      />

                      <p>{question.upVote.length - question.downVote.length}</p>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body" dangerouslySetInnerHTML={{__html: question.questionBody}} />
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>

                          {User?.result?._id === question.userId && (
                            <button type="delete" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="30px"
                              py="30px"
                              borderRadius="5px"
                            >
                              {userQuestioned?.profileImg !== "" ? (
                                <img
                                  src={userQuestioned?.profileImg}
                                  alt="Dp"
                                />
                              ) : (
                                <p>{userQuestioned?.name.charAt(0)}</p>
                              )}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>

                    <DisplayAnswers
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                      User={User}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answers</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name="
                    "
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {tag}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
