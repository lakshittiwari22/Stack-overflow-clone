import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-to-clipboard";
import {
  faShare,
  faThumbsUp,
  faComment,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import Avatar from "../../components/Avatar/Avatar";
import { LikePublicPost } from "../../actions/post";
import icon from "../../assets/stack-overflow.png";

const Post = ({ post }) => {
  let User = useSelector((state) => state.currentUserReducer);
  const url = "localhost:3000";

  const id = post._id;
  const activeUsername = User?.result.name;

  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLikes = () => {
    dispatch(LikePublicPost(id, User.result._id));
    //   if(like !== true){
    //   if (Notification.permission === 'granted') {
    //     new Notification('Like', {
    //       body: `${activeUsername} liked your post`,
    //       icon: {icon},
    //     });
    //   }
    // }

    setLike(!like);
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("copied to clipboard");
  };

  const userLiked = post.likes.findIndex((id) => User.result._id === id);
  console.log(userLiked);

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

      <div
        className="caption-container"
        onClick={() => navigate(`/Social/${post._id}`)}
      >
        <p>{post.caption}</p>
      </div>
      <div
        className={
          post.postMedia
            ? "post-image-container"
            : "post-image-container-inactive"
        }
      >
        {post.contentType === "image" ? (
          <Link to={`/Social/${post._id}`}>
            <img src={post.postMedia} alt="displayImg" />
          </Link>
        ) : post.contentType === "video" ? (
          <video width="100%" height="100%" controls>
            <source src={post.postMedia} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
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
          className={userLiked === -1 ? "like-btn" : "like-btn-active"}
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

        <button className="share-btn" onClick={handleShare}>
          <FontAwesomeIcon icon={faShare} className="btn-icon" />
          <p>share</p>
        </button>
      </div>
    </div>
  );
};

export default Post;
