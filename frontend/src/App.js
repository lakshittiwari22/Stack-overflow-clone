import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/navbar/navbar";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";

import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { FetchAllPosts } from "./actions/post";
import { InitializeNotification } from "./components/initializeNotification";


function App() {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.currentUserReducer);
  const currentUserId = currentUser?.result._id;

  useEffect(() => {

    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(FetchAllPosts());

    // Listen for 'newPostNotification' event from the server

    if (currentUserId) {
      const socketCleanup = InitializeNotification(dispatch, currentUserId);

      return () => {
        // Disconnect the socket when the component unmounts
        socketCleanup();
        // socket.off("newPostNotification");
        // socket.off("newQuestionNotification");
        // socket.off("newAnswerNotification");
      };
    } else {
      console.log("no user!!!");
    }
  }, [dispatch, currentUserId]);

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
