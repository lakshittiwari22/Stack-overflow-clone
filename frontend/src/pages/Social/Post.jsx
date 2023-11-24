import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faThumbsUp,
  faComment,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Avatar from "../../components/Avatar/Avatar";

import { LikePublicPost } from "../../actions/post";

const Post = ({ post }) => {
  let User = useSelector((state) => state.currentUserReducer);

  const id = post._id;

  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleLikes = () => {
    dispatch(LikePublicPost(id, User.result._id));
    setLike(!like);
  };

  return (
    <div className="display-post">
      <div className="username-container">
        <Avatar
          backgroundColor="#009dff"
          px="20px"
          py="0px"
          borderRadius="50%"
          color="white"
        >
          <Link
            to={`/Users/${post?.userId}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>{post.userPosted.charAt(0)}</p>
          </Link>
        </Avatar>
        <div className="username-container-2">
          <div style={{ fontWeight: "bold" }}>{post.userPosted}</div>
          <div style={{ color: "#8d949e", fontSize: "13px" }}>
            <span>{moment(post.postedOn).fromNow()}</span> .{" "}
            <FontAwesomeIcon icon={faEarthAsia} />
          </div>
        </div>
      </div>

      <div className="caption-container">
        <p>{post.caption}</p>
      </div>
      <div
        className={
          post.postImg
            ? "post-image-container"
            : "post-image-container-inactive"
        }
      >
        <Link to={`/Social/${post._id}`}>
          <img src={post.postImg} alt="displayImg" />
        </Link>
      </div>
      <div className="post-details-container">
        <p style={{ fontSize: "12px", color: "slateGray" }}>
          {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
        </p>

        <p style={{ fontSize: "12px", color: "slateGray" }}>
          {post.noOfComments} Comments
        </p>
      </div>

      <div className="line"></div>

      <div className="post-btn">
        <button
          className={!like ? "like-btn" : "like-btn-active"}
          onClick={handleLikes}
        >
          <FontAwesomeIcon icon={faThumbsUp} className="btn-icon" />
          <p>Like</p>
        </button>
        <Link style={{ textDecoration: "none" }} to={`/Social/${post._id}`}>
          <button className="comment-btn">
            <FontAwesomeIcon icon={faComment} className="btn-icon" />
            <p>Comment</p>
          </button>
        </Link>

        <button className="share-btn">
          <FontAwesomeIcon icon={faShare} className="btn-icon" />
          <p>share</p>
        </button>
      </div>
    </div>
  );
};

export default Post;
