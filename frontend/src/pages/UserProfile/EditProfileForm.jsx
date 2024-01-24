import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX} from "@fortawesome/free-solid-svg-icons";
// import { updateUserProfile } from "../../actions/auth";

const EditProfileForm = ({ currentUser, setSwitch }) => {
  const [name, setName] = useState(currentUser?.result?.name);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState(currentUser?.result?.about);
  const [tags, setTags] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const dispatch = useDispatch();
  const id = currentUser?.result?._id;

  //generating custom avatars using robohash.org--------------------------
  const avatarOptions = [];
  for (let i = 1; i <= 100; i++) {
    avatarOptions.push(`https://robohash.org/avatar${i}.png`);
  }
  //------------------------------------------------------------------------
const newPhoneNumber = '+91'+phoneNumber
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(
        updateProfile(id, { name,phoneNumber: newPhoneNumber, about, tags, profileImg: profilePicture })
      );
    }
    setProfilePicture("");
    setSwitch(false);
  };

  const hadleSelection = (avatar) => {
    setProfilePicture(avatar);
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];

    // Read the file as base64
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfilePicture(reader.result);

      reader.onerror = (error) => {
        console.log("Error ", error);
      };
    };
  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="name">
          <h3>Phone Number</h3>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label htmlFor="profileImg">
          <h3>Update Profile Picture</h3>
          <input
            type="file"
            id="profileImg"
            accept="image/*"
            
            
            onChange={convertToBase64}
          />
        </label>
        {/* display seleted profilepicture------------------------- */}
        <div
          className={
            profilePicture ? "display-dp-active" : "display-dp-inactive"
          }
        >
          <FontAwesomeIcon icon={faX} className="close" onClick={()=> setProfilePicture('')}/>
          <img src={profilePicture} alt="profile" />
        </div>
        <label htmlFor="">
          <h3>Choose Your Robo Avatar</h3>

          <div className="avatar-selection-conatiner">
            <div className="avatar-conatiner-inner">
              {avatarOptions.map((avatar, index) => {
                return (
                  <div className="avatar-item">
                    <img
                      key={index}
                      src={avatar}
                      alt={`avatar ${index}`}
                      onClick={() => hadleSelection(avatar)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </label>

        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            y
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched Tags</h3>
          <p>Add tags seperated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
