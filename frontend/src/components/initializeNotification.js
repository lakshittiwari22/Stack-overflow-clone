import { useSelector } from "react-redux";
import { FetchAllPosts } from "../actions/post";
import { fetchAllQuestions } from "../actions/question";
import socket from "../webSocket/Socket";

export const initializeNotification = (dispatch) => {
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

  socket.on("newPostNotification", (data) => {
    let currentUser = useSelector((state) => state.currentUserReducer);
    const { userPosted, userId } = data.message;
    if (data && currentUser?.result._id !== userId) {
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: `${userPosted} created a new post`,
          // icon: { icon },
        });
      }
      dispatch(FetchAllPosts());
    }
  });

  socket.on("newQuestionNotification", (data) => {
    let currentUser = useSelector((state) => state.currentUserReducer);
    const { userPosted, userId } = data.message;
    if (data && currentUser?.result._id !== userId) {
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: `${userPosted} posted a new question`,
          // icon: { icon },
        });
      }
      dispatch(fetchAllQuestions());
    }
  });

  socket.on("newAnswerNotification", (data) => {
    let currentUser = useSelector((state) => state.currentUserReducer);
    const { userPosted, userId, userQuestioned } = data.message;
    if (data && currentUser?.result._id !== userId) {
      console.log(data);
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: `${userPosted} answered ${userQuestioned}'s question`,
          // icon: { icon },
        });
      }
      dispatch(fetchAllQuestions());
    }
  });

  return () => {
    socket.off("newPostNotification");
    socket.off("newQuestionNotification");
    socket.off("newAnswerNotification");
  };
};
