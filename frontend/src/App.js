import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { FetchAllPosts } from "./actions/post";

import socket from "./webSocket/Socket";

function App() {
  const dispatch = useDispatch();
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
  
  useEffect(() => {
    // Listen for 'newPostNotification' event from the server
    socket.on("newPostNotification", (data) => {
      if (data) {
        dispatch(FetchAllPosts());
      }
    });

    socket.on("newQuestionNotification", (data) => {
      if (data) {
        dispatch(fetchAllQuestions());
      }
    });

    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(FetchAllPosts());
    return () => {
      // Disconnect the socket when the component unmounts
      // socket.disconnect();
      socket.off("newPostNotification");
      socket.off("newQuestionNotification");
    };
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
