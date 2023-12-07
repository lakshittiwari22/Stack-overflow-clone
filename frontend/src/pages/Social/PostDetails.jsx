import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-to-clipboard";
import {
  faTrash,
  faEarthAsia,
  faShare,
  faThumbsUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../components/Avatar/Avatar";

import DisplayComments from "./DisplayComments";
import { useDispatch, useSelector } from "react-redux";
import { LikePublicPost, deletePost, postComment } from "../../actions/post";
import moment from "moment";

const PostDetails = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []); // The empty dependency array ensures that this effect runs only once

  const { id } = useParams();
  const url = "localhost:3000";

  const posts = useSelector((state) => state.postReducer);
  let User = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.usersReducer);

  const singlePost = posts.data?.filter((post) => post._id === id);
  const postProfile = users.filter(
    (user) => user._id === singlePost[0].userId
  )[0];
  

  // defining variable for changing the css class of like button
  const userLiked = singlePost?.map((post) => {
    return post.likes?.findIndex((id) => User?.result._id === id);
  });

  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLikes = () => {
    dispatch(LikePublicPost(id, User.result._id));
  };

  const handleSubmit = (e, commentLength) => {
    e.preventDefault();

    if (comment) {
      dispatch(
        postComment({
          id,
          commentBody: comment,
          noOfComments: commentLength + 1,
          userCommented: User.result.name,
          userId: User.result._id,
        })
      );
    } else {
      alert("comment cannot be empty");
    }

    setComment("");
    setIsSubmitting(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(id, navigate));
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("copied to clipboard");
  };

  return (
    <div className="post-div">
      <h2>Post Details</h2>
      {singlePost?.map((post) => {
        return (
          <div key={post._id}>
            <section className="display-post">
              <div className="header">
                <div className="username">
                  <h1>{post.userPosted}'s post</h1>
                </div>
                {User?.result?._id === post.userId && (
                  <div className="delete-icon">
                    <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
                  </div>
                )}
              </div>

              <div className="line"></div>

              <div className="username-container">
                <Avatar
                  backgroundColor="#009dff"
                  px="40px"
                  py="40px"
                  borderRadius="50%"
                  color="white"
                >
                  {postProfile.profileImg !== "" ? (
                    <img
                      src={postProfile?.profileImg}
                      alt="profile-picture"
                      onClick={() => navigate(`/Users/${post?.userId}`)}
                    />
                  ) : (
                    <p onClick={() => navigate(`/Users/${post?.userId}`)}>
                      {postProfile.name.charAt(0)}
                    </p>
                  )}
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
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "like" : "likes"}
                </p>

                <p style={{ fontSize: "12px", color: "slateGray" }}>
                  {post.noOfComments} Comments
                </p>
              </div>

              <div className="line"></div>

              <div className="post-btn">
                <button
                  className={
                    userLiked?.toString() === "-1"
                      ? "like-btn"
                      : "like-btn-active"
                  }
                  onClick={handleLikes}
                >
                  <FontAwesomeIcon icon="fa-regular fa-thumbs-up" />
                  <FontAwesomeIcon icon={faThumbsUp} className="btn-icon" />
                  <p>Like</p>
                </button>

                <button className="comment-btn">
                  <FontAwesomeIcon icon={faComment} className="btn-icon" />
                  <p>Comment</p>
                </button>

                <button className="share-btn" onClick={handleShare}>
                  <FontAwesomeIcon icon={faShare} className="btn-icon" />
                  <p>share</p>
                </button>
              </div>
              <div className="line"></div>

              <div className="comment-section">
                {post.comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <DisplayComments comment={comment} post={post} />
                    </div>
                  );
                })}
              </div>
              <section className="post-comment-container">
                <div className="textarea-container">
                  <div className="avatar-container">
                    <Avatar
                      backgroundColor="#009dff"
                      px="40px"
                      py="40px"
                      borderRadius="50%"
                      color="white"
                    >
                      {User?.result.profileImg !== "" ? (
                        <img
                          src={User?.result.profileImg}
                          alt="profile-image"
                        />
                      ) : (
                        <p>{User?.result.name.charAt(0)}</p>
                      )}
                    </Avatar>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, post.comments.length)}>
                    <textarea
                      name=""
                      id=""
                      cols="80"
                      rows="4"
                      placeholder="Write a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit" disabled={isSubmitting}>
                      send
                    </button>
                  </form>
                </div>
              </section>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default PostDetails;
