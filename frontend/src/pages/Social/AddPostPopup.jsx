import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Filter from "bad-words";
import Sentiment from "sentiment";

import { CreatePublicPost } from "../../actions/post";
import customBadWords from "./badwords";

const AddPostPopup = ({ trigger, setTrigger }) => {
  let User = useSelector((state) => state.currentUserReducer);
  let allUsers = useSelector((state) => state.usersReducer);
  const currentUser = allUsers?.filter(
    (user) => user._id === User?.result?._id
  )[0];
  const [mediaType, setMediaType] = useState(""); // Added state to track media type
  const [media, setMedia] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCaptionEmpty = /^\s*$/.test(caption);
    if (User) {
      if (
        !isCaptionEmpty &&
        !containsBadWords(caption) &&
        !containsHateSpeech(caption)
      ) {
        dispatch(
          CreatePublicPost(
            {
              caption,
              postMedia: media,
              contentType: mediaType,
              userPosted: User.result.name,
              userId: User.result._id,
            },
            navigate
          )
        );
        setTrigger(!trigger);
      } else if (isCaptionEmpty) {
        alert("Enter Caption!");
      } else {
        alert(
          "Caption contains inappropriate language. Please modify and try again."
        );
      }
    } else {
      alert("Login to Post");
    }

    setMedia("");
    setMediaType("");
    setCaption("");
  };

  const sentiment = new Sentiment();

  // Function to check for hate speech
  function containsHateSpeech(text) {
    const result = sentiment.analyze(text);

    // Adjust the threshold based on your needs
    return result.score < 0;
  }

  const convertToBase64 = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file type based on extension
      const fileType = file.type.split("/")[0];

      // Set media type state
      setMediaType(fileType);

      // Read the file as base64
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setMedia(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error ", error);
      };
    }
  };

  // Function to check for bad words
  const containsBadWords = (text) => {
    const filter = new Filter();

    filter.addWords(...customBadWords);
    return filter.isProfane(text);
  };

  return trigger ? (
    <div className="popup-container">
      <div className="popup-inner">
        <div className="header">
          <div className="heading">
            <h1>Create Post</h1>
          </div>

          <div
            className="icon"
            onClick={() => {
              setTrigger(!trigger);
              setMedia("");
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>

        <div className="line"></div>

        <div className="user-container">
          <Avatar
            backgroundColor="#009dff"
            px="40px"
            py="40px"
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
          <p style={{ fontWeight: "bold" }}>{User?.result.name}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="What's on your mind"
              id="popup-input"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </div>

          <div className="upload-container">
            <label htmlFor="upload-img">
              <div className="drop-container">
                <div className="drop-icon-container">
                  <FontAwesomeIcon icon={faPhotoFilm} className="drop-icon" />
                </div>

                <p>Upload Photo/Video</p>
              </div>
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              id="upload-img"
              hidden
              onChange={convertToBase64}
            />
            {/* Conditionally render the media based on type */}
            {mediaType === "image" && media && (
              <img src={media} alt="Uploaded Image" width="150" height="150" />
            )}

            {mediaType === "video" && media && (
              <video width="320" height="240" controls>
                <source src={media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="popup-btn">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddPostPopup;
