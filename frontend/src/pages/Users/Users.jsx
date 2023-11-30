import React from "react";

import "./users.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import UsersList from "./UsersList";

const Users = () => {
  

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <h1 className="users-heading" style={{marginTop:'50px', fontWeight:"400",}}>Users</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;
