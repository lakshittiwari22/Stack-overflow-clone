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

  socket.on("upVoteNotification", (data) => {
    console.log(`upVote: ${data.message}`);
    const { userId, userVoted, userQuestionedId } = data.message;

    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          new Notification("Post", {
            body: `${userVoted} upVoted your question`,
            icon: { notificationIcon },
          });
        }
      }

      dispatch(fetchAllQuestions());
    }
  });

  socket.on("downVoteNotification", (data) => {
    const { userId, userVoted, userQuestionedId } = data.message;

    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          new Notification("Post", {
            body: `${userVoted} downVoted your question`,
            icon: { notificationIcon },
          });
        }
      }

      dispatch(fetchAllQuestions());
    }
  });

  socket.on("newAnswerNotification", (data) => {
    const { userPosted, userId, userQuestionedId } = data.message;
    if (data && currentUserId && currentUserId === userQuestionedId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          new Notification("Post", {
            body: `${userPosted} answered your question`,

            icon: { notificationIcon },
          });
        }
        dispatch(fetchAllQuestions());
      }
    }
  });

  socket.on("likeNotification", (data) => {
    console.log(data);
    const { userId, userLiked, postProfileId } = data.message;
    if (data && currentUserId && currentUserId === postProfileId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          new Notification("Post", {
            body: `${userLiked} liked your post`,

            icon: { notificationIcon },
          });
        }
        dispatch(FetchAllPosts());
      }
    }
  });

  socket.on("newCommentNotification", (data) => {
    const { userId, userCommented, postProfileId } = data.message;
    if (data && currentUserId && currentUserId === postProfileId) {
      if (currentUserId && currentUserId !== userId) {
        if (Notification.permission === "granted") {
          new Notification("Post", {
            body: `${userCommented} commented on your post`,

            icon: { notificationIcon },
          });
        }
        dispatch(FetchAllPosts());
      }
    }
  });

  return () => {
    socket.off("newPostNotification");
    socket.off("newQuestionNotification");
    socket.off("newAnswerNotification");
  };
};
