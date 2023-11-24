import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import HomeMainBar from "../../components/HomeMainBar/HomeMainBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import AllPosts from "./AllPosts";

const SocialPage = () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <AllPosts/>
        <RightSideBar />
      </div>
    </div>
  );
};

export default SocialPage;
