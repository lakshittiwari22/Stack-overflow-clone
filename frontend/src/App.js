import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { FetchAllPosts } from "./actions/post";
import { io } from "socket.io-client";
import socket from "./Socket";

function App() {
  const dispatch = useDispatch();
  //"http://localhost:5000"
  //"https://stack-overflow-clone-server-ebfz.onrender.com"
  useEffect(() => {
    

    // Listen for 'newPostNotification' event from the server
    socket.once("newPostNotification", (data) => {
      if (data) {
        dispatch(FetchAllPosts());
      }
    });

    socket.once("newQuestionNotification", (data) => {
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
