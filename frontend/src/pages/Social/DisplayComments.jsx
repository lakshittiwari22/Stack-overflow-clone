import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";

const DisplayComments = ({ comment }) => {

    
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
          <p>L</p>
          {/* <Link
                  to={`/Users/${User?.result._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {User.result.name.charAt(0)}
                </Link> */}
        </Avatar>
      </div>
      <div className="comment-container-2">
        <span style={{fontSize:"10px", fontWeight:"bold"}}>{comment.userCommented} </span>
        <p className="comment">{comment.commentBody}</p>
        <p style={{fontSize:"10px", color:'darkgrey'}}>{moment(comment.commentedOn).fromNow()}</p>
        
      </div>
      
    </div>
  );
};

export default DisplayComments;
