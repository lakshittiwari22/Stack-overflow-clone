import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./social.css";
import Avatar from "../../components/Avatar/Avatar";
import Post from "./Post";
import AddPostPopup from "./AddPostPopup";

const AllPosts = () => {
  const Posts = useSelector((state) => state.postReducer);
  

  const [popup, setPopup] = useState(false);
  let User = useSelector((state) => state.currentUserReducer);

  const handleTrigger = () => {
    setPopup(!popup);
  };

  return (
    <div className="post-div">
      

      <div className="create-area">
        <div className="create-area-input">
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
          <form>
            <input
              type="text"
              placeholder="What's on your mind,Lakshit"
              id="popup-input"
              autoComplete="off"
              onClick={handleTrigger}
            />
          </form>
        </div>
        <div className="line"></div>
        <div className="create-area-btn">
          <button onClick={handleTrigger}>
            <FontAwesomeIcon icon={faPhotoFilm} className="icon" />
            <Link
              style={{
                textDecoration: "none",
                color: "#3a3a3a",
                fontWeight: "550",
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
          Posts.data?.map((post) => {
            return <Post post={post} key={post._id} />;
          })
        )}
      </div>
      <AddPostPopup trigger={popup} setTrigger={setPopup} />
    </div>
  );
};

export default AllPosts;
