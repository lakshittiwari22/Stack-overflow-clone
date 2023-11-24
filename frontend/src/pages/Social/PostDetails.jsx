import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const PostDetails = () => {
  const { id } = useParams();

  const posts = useSelector((state) => state.postReducer);

  const singlePost = posts.data?.filter((post) => post._id === id);
  let User = useSelector((state) => state.currentUserReducer);

  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLikes = () => {
    dispatch(LikePublicPost(id, User.result._id));
    setLike(!like);
  };

  const handleSubmit = (e, commentLength) => {
    e.preventDefault();
    dispatch(
      postComment({
        id,
        commentBody: comment,
        noOfComments: commentLength + 1,
        userCommented: User.result.name,
        userId: User.result._id,
      })
    );
    setComment(" ");
  };

  const handleDelete = () => {
    dispatch(deletePost(id, navigate));
  }

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
                           <FontAwesomeIcon icon={faTrash} onClick={handleDelete}/>
                         </div>
                          )}
                
              </div>

              <div className="line"></div>

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
                    <p>{post?.userPosted.charAt(0)}</p>
                  </Link>
                </Avatar>
                <div className="username-container-2">
                  <div style={{ fontWeight: "bold" }}>{post.userPosted}</div>
                  <div style={{ color: "#8d949e", fontSize: "13px" }}>
                    <span>21 nov</span> . <FontAwesomeIcon icon={faEarthAsia} />
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
                <img src={post.postImg} alt="displayImg" />
              </div>

              <div className="post-details-container">
                <p style={{fontSize: "12px",color:"slateGray"}}>{post.likes.length} {post.likes.length === 1 ? "like" : "likes"}</p>

                <p style={{fontSize: "12px",color:"slateGray"}}>{post.noOfComments} Comments</p>
              </div>

              <div className="line"></div>

              <div className="post-btn">
                <button
                  className={!like ? "like-btn" : "like-btn-active"}
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

                <button className="share-btn">
                  <FontAwesomeIcon icon={faShare} className="btn-icon" />
                  <p>share</p>
                </button>
              </div>
              <div className="line"></div>

              <div className="comment-section">
                {post.comments.map((comment) => {
                  return (
                    <div key={comment.id}>
                      <DisplayComments comment={comment} />
                    </div>
                  );
                })}
              </div>
              <section className="post-comment-container">
                <div className="textarea-container">
                  <div className="avatar-container">
                    <Avatar
                      backgroundColor="#009dff"
                      px="20px"
                      py="0px"
                      borderRadius="50%"
                      color="white"
                    >
                      <Link
                        to={`/Users/${User?.result._id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <p>{User?.result.name.charAt(0)}</p>
                      </Link>
                    </Avatar>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, post.comments.length)}>
                    <textarea
                      name=""
                      id=""
                      cols="80"
                      rows="4"
                      placeholder="Write a comment"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button type="submit">send</button>
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
