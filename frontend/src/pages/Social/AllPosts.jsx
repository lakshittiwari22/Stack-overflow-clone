import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./social.css";
import Avatar from "../../components/Avatar/Avatar";
import Post from "./Post";
import AddPostPopup from "./AddPostPopup";

const AllPosts = () => {
  const Posts = useSelector((state) => state.postReducer);

  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  let User = useSelector((state) => state.currentUserReducer);
  let allUsers = useSelector((state) => state.usersReducer);
  const currentUser = allUsers?.filter(
    (user) => user._id === User?.result?._id
  )[0];

  const handleTrigger = () => {
    setPopup(!popup);
  };

  return (
    <div className="post-div">
      <div className="create-area">
        <div className="create-area-input">
          <Avatar
            backgroundColor="#009dff"
            px="56px"
            py="50px"
            borderRadius="50%"
            color="white"
          >
            {currentUser?.profileImg !== "" ? (
              <img
                src={currentUser?.profileImg}
                alt="profile-pictures"
                onClick={() => navigate(`/Users/${User?.result._id}`)}
              />
            ) : (
              <p onClick={() => navigate(`/Users/${User?.result._id}`)}>
                {currentUser?.name.charAt(0)}
              </p>
            )}
          </Avatar>

          <input
            type="text"
            placeholder={`What's on your mind, ${
              User?.result.name.split(" ")[0]
            }`}
            id="popup-input"
            autoComplete="off"
            onClick={handleTrigger}
          />
        </div>
        <div className="line"></div>
        <div className="create-area-btn">
          <button onClick={handleTrigger}>
            <FontAwesomeIcon icon={faPhotoFilm} className="icon" />
            <Link
              style={{
                textDecoration: "none",
                color: 'var(--text-body-secondry)'
              }}
            >
              <p>Photo/video</p>
            </Link>
          </button>
        </div>
      </div>

      <div>
        {Posts.data === null ? (
          <h1>Loding...</h1>
        ) : (
          Posts.data
            ?.slice()
            .reverse()
            .map((post) => {
              return <Post post={post} key={post._id} />;
            })
        )}
      </div>
      <AddPostPopup trigger={popup} setTrigger={setPopup} />
    </div>
  );
};

export default AllPosts;
