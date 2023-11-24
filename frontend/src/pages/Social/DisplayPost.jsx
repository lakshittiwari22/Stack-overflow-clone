import React from "react";
import PostDetails from "./PostDetails";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";

const DisplayPost = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <PostDetails/>
        <RightSideBar />
      </div>
    </div>
  );
};

export default DisplayPost;
