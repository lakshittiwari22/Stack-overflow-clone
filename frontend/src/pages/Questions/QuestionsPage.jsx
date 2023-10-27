import React from "react";
import "./questionspage.css";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import HomeMainBar from "../../components/HomeMainBar/HomeMainBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";


const QuestionsPage= () => {
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <HomeMainBar />
        <RightSideBar />
      </div>
    </div>
  );
};

export default QuestionsPage;
