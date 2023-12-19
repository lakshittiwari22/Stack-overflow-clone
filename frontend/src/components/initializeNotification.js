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
        if (data) {
          if (Notification.permission === "granted") {
            new Notification("Post", {
              body: `${data.message} created a new post`,
              // icon: { icon },
            });
          }
          dispatch(FetchAllPosts());
        }
      });
  
      socket.on("newQuestionNotification", (data) => {
        if (data) {
          if (Notification.permission === "granted") {
            new Notification("Post", {
              body: `${data.message} posted a new question`,
              // icon: { icon },
            });
          }
          dispatch(fetchAllQuestions());
        }
      });

      return () => {
        socket.off("newPostNotification");
        socket.off("newQuestionNotification");
      }
} 