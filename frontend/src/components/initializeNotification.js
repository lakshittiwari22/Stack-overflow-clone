import { FetchAllPosts } from "../actions/post";
import { fetchAllQuestions } from "../actions/question";
import socket from "../webSocket/Socket";
import notificationIcon from "../assets/favicon-32x32.png";

export const InitializeNotification = (dispatch, currentUserId) => {
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
    const { userPosted, userId } = data.message;
    if (data && currentUserId && currentUserId !== userId) {
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: `${userPosted} created a new post`,
          icon: { notificationIcon },
        });
      }
      dispatch(FetchAllPosts());
    }
  });

  socket.on("newQuestionNotification", (data) => {
    const { userPosted, userId } = data.message;

    if (data && currentUserId && currentUserId !== userId) {
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: `${userPosted} posted a new question`,
          icon: { notificationIcon },
        });
      }
      dispatch(fetchAllQuestions());
    }
  });

  socket.on("newAnswerNotification", (data) => {
    const { userPosted, userId, userQuestioned } = data.message;

    const notificationText =
      userId === currentUserId
        ? `${userPosted} answered his own question`
        : `${userPosted} answered ${userQuestioned}'s question`;

    if (data && currentUserId && currentUserId !== userId) {
      if (Notification.permission === "granted") {
        new Notification("Post", {
          body: notificationText,

          icon: { notificationIcon },
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
