import { FetchAllPosts } from "../actions/post";
import { fetchAllQuestions } from "../actions/question";
import socket from "../webSocket/Socket";
import notificationIcon from "../assets/stack-overflow-notification-icon.png";

export const InitializeNotification = (dispatch, currentUserId) => {
  const baseUrl = window.location.origin;
  //seeking permision
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission not granted");
      }
    });
  }

  const createClickableNotification = (title, body, url) => {
    const notification = new Notification(title, {
      body,
      icon: notificationIcon,
    });

    // Handle notification click
    notification.addEventListener("click", () => {
      if (url) {
        // Redirect to the specified URL
        window.open(url, "_blank");
      }
    });
  };

  socket.on("newQuestionNotification", (data) => {
    const { userPosted, userId } = data.message;

    if (data && currentUserId && currentUserId !== userId) {
      if (Notification.permission === "granted") {
        createClickableNotification(
          "Question",
          `${userPosted} posted a new question`,
          `${baseUrl}/Questions`
        );
        dispatch(fetchAllQuestions());
      }
    }
  });

  socket.on("upVoteNotification", (data) => {
    const { _id, userId, userVoted, userQuestionedId } = data.message;

    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          createClickableNotification(
            "Vote",
            `${userVoted} upVoted your question`,
            `${baseUrl}/Questions/${_id}`
          );
          dispatch(fetchAllQuestions());
        }
      }
    }
  });

  socket.on("downVoteNotification", (data) => {
    const { _id, userId, userVoted, userQuestionedId } = data.message;

    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          createClickableNotification(
            "Vote",
            `${userVoted} downVoted your question`,
            `${baseUrl}/Questions/${_id}`
          );
          dispatch(fetchAllQuestions());
        }
      }
    }
  });

  socket.on("newAnswerNotification", (data) => {
    const { _id, userPosted, userId, userQuestionedId } = data.message;
    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          createClickableNotification(
            "Answer",
            `${userPosted} answered your question`,
            `${baseUrl}/Questions/${_id}`
          );
          dispatch(fetchAllQuestions());
        }
      }
    }
  });

  socket.on("newPostNotification", (data) => {
    const { userPosted, userId } = data.message;
    if (data && currentUserId && currentUserId !== userId) {
      if (Notification.permission === "granted") {
        createClickableNotification(
          "Post",
          `${userPosted} created a new post`,
          `${baseUrl}/Social`
        );
        dispatch(FetchAllPosts());
      }
    }
  });

  socket.on("likeNotification", (data) => {
    console.log(data);
    const { _id, userId, userLiked, postProfileId } = data.message;
    if (data && currentUserId && currentUserId === postProfileId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          createClickableNotification(
            "Like",
            `${userLiked} liked your post`,
            `${baseUrl}/Social/${_id}`
          );
          dispatch(FetchAllPosts());
        }
      }
    }
  });

  socket.on("newCommentNotification", (data) => {
    const { _id, userId, userCommented, postProfileId } = data.message;
    if (data && currentUserId && currentUserId === postProfileId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          createClickableNotification(
            "Comment",
            `${userCommented} commented on your post`,
            `${baseUrl}/Social/${_id}`
          );
        }
        dispatch(FetchAllPosts());
      }
    }
  });

  return () => {
    socket.off("newQuestionNotification");
    socket.off("newAnswerNotification");
    socket.off("upVoteNotification");
    socket.off("downVoteNotification");
    socket.off("newPostNotification");
    socket.off("newCommentNotification");
    socket.off("likeNotification");
  };
};
