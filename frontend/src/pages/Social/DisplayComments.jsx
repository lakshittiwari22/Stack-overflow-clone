import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../actions/post";

const DisplayComments = ({ comment, post }) => {
  const dispatch = useDispatch();

  const { id } = useParams();
  let User = useSelector((state) => state.currentUserReducer);

  const handleDelete = (commentId, noOfComments) => {
    dispatch(deleteComment(id, commentId, noOfComments - 1));
  };

  return (
    <div className="comment-container">
      <div className="comment-avatar">
        <Avatar
          backgroundColor="magenta"
          px="20px"
          py="0px"
          borderRadius="50%"
          color="white"
        >
          <Link
            to={`/Users/${comment.userId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>{comment.userCommented.charAt(0)}</p>
          </Link>
        </Avatar>
      </div>
      <div className="comment-container-2">
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
          {comment.userCommented}{" "}
        </span>
        <p className="comment">{comment.commentBody}</p>
        <p style={{ fontSize: "10px", color: "darkgrey" }}>
          {moment(comment.commentedOn).fromNow()}{" "}
          {User?.result._id === comment.userId && (
            <FontAwesomeIcon
              icon={faTrash}
              className="comment-delete-btn"
              onClick={() => handleDelete(comment._id, post.noOfComments)}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default DisplayComments;
