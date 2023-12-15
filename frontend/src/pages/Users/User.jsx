import React from "react";
import { Link } from "react-router-dom";

import "./users.css";
import Avatar from "../../components/Avatar/Avatar";

export const User = ({ user }) => {
  
  return (
    <>
      <Link to={`/Users/${user._id}`} className="user-profile-link">
        <Avatar
          backgroundColor="#dbdbdb"
          px="40px"
          py="40px"
          borderRadius="10%"
          color="white"
        >
          {user?.profileImg !== "" ? (
            <img src={user?.profileImg} alt="profile-pictures" />
          ) : (
            <p>{user?.name.charAt(0)}</p>
          )}
        </Avatar>
        <h5>{user.name}</h5>
      </Link>
    </>
  );
};

export default User;
