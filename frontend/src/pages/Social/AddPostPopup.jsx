import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { CreatePublicPost } from "../../actions/post";

const AddPostPopup = ({ trigger, setTrigger }) => {
  let User = useSelector((state) => state.currentUserReducer);
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (caption) {
        dispatch(
          CreatePublicPost(
            {
              caption,
              postImg: image,
              userPosted: User.result.name,
              userId: User.result._id,
            },
            navigate
          )
        );
        setTrigger(!trigger);
      } else alert("Enter Caption!");
    } else alert("Login to Post");
  };

  const convertToBase64 = (e) => {
    
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error ", error);
    };
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
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>

        <div className="line"></div>

        <div className="user-container">
          <Avatar
            backgroundColor="#009dff"
            px="20px"
            py="14px"
            borderRadius="50%"
            color="white"
          >
           
            <Link
                  to={`/Users/${User?.result._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {User?.result.name.charAt(0)}
                </Link>
          </Avatar>
          <p style={{fontWeight:"bold"}}>{User?.result.name}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="What's on your mind"
              id="popup-input"
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
              accept="image/*"
              id="upload-img"
              hidden
              onChange={convertToBase64}
            />
            {image && <img src={image} alt="" />}
            
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
