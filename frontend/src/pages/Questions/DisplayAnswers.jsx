import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import Avatar from "../../components/Avatar/Avatar";
import "./questionspage.css";
import { deleteAnswer } from "../../actions/question";

const DisplayAnswers = ({ question, handleShare, User }) => {
  let allUsers = useSelector((state) => state.usersReducer);
  const userWhoAnswered = allUsers?.filter(
    (user) => user?._id === question.answer[0].userId
  )[0];


  const { id } = useParams();
  const dispatch = useDispatch();

  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p className="answer-body"
            dangerouslySetInnerHTML={{
              __html: ans.answerBody,
            }}
          />

          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === ans.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightGreen"
                  borderRadius="5px"
                  px="30px"
                  py="30px"
                >
                  {userWhoAnswered?.profileImg !== "" ? (
                    <img src={userWhoAnswered?.profileImg} alt="Dp" />
                  ) : (
                    <p>{userWhoAnswered?.name.charAt(0)}</p>
                  )}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
