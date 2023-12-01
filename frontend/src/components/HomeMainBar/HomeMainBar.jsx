import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import "./homemainbar.css";
import QuestionList from "./QuestionList";
import socket from "../../Socket";

const HomeMainBar = () => {
  if ("Notification" in window) {
    // Request permission to show notifications
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("permission granted");
      } else {
        console.log("permission not granted");
      }
    });
  }

  // useEffect(() => {
  //   //  "http://localhost:5000"
  //   //"https://stack-overflow-clone-server-ebfz.onrender.com"
   

  //   // Listen for 'newPostNotification' event from the server
  //   socket.on("newQuestionNotification", (data) => {
  //     console.log(data.message);
  //     // if (data) {
  //     //   if (Notification.permission === "granted") {
  //     //     new Notification("Post", {
  //     //       body: `${data.message} posted a new question`,
  //     //       // icon: { icon },
  //     //     });
  //     //   }
  //     // }
  //   });

  //   return () => {
  //     // Disconnect the socket when the component unmounts
  //     socket.off("newQuestionNotification");
  //   };
  // }, []);

  let User = useSelector((state) => state.currentUserReducer);

  const navigate = useNavigate();

  const location = useLocation();

  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if (User === null) {
      alert("login or signup to ask aquestion");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}

        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1 className="loding">Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <>
              <QuestionList questionsList={questionsList.data} />
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainBar;
