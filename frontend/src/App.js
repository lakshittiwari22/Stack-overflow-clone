import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar";
import AllRoutes from "./AllRoutes";
import { useEffect } from "react";

import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { FetchAllPosts } from "./actions/post";
import { initializeNotification } from "./components/initializeNotification";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for 'newPostNotification' event from the server

    const socketCleanup = initializeNotification(dispatch);

    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
    dispatch(FetchAllPosts());
    return () => {
      // Disconnect the socket when the component unmounts
      socketCleanup();
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
