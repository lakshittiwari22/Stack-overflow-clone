import { Server } from "socket.io";

let io;

export const initializeWebSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export const emitNewPostNotification = (userPosted, userId) => {
  if (io) {
    io.emit("newPostNotification", { message: { userPosted, userId } });
  }
};

export const emitNewQuestionNotification = (userPosted, userId) => {
  if (io) {
    io.emit("newQuestionNotification", { message: { userPosted, userId } });
  }
};

export const emitNewAnswerNotification = (
  _id,
  userPosted,
  userId,
  userQuestioned,
  userQuestionedId
) => {
  if (io) {
    io.emit("newAnswerNotification", {
      message: { _id, userPosted, userId, userQuestioned, userQuestionedId },
    });
  }
};

export const emitLikeNotification = (_id, userId, userLiked, postProfileId) => {
  if (io) {
    io.emit("likeNotification", {
      message: { _id, userId, userLiked, postProfileId },
    });
  }
};
export const emitUpVoteNotification = (
  _id,
  userId,
  userVoted,
  userQuestionedId
) => {
  if (io) {
    console.log(`socket:${userId}`);
    io.emit("upVoteNotification", {
      message: { _id, userId, userVoted, userQuestionedId },
    });
  }
};
export const emitDownVoteNotification = (
  _id,
  userId,
  userVoted,
  userQuestionedId
) => {
  if (io) {
    io.emit("downVoteNotification", {
      message: { _id, userId, userVoted, userQuestionedId },
    });
  }
};

export const emitNewCommentNotification = (
  _id,
  userId,
  userCommented,
  postProfileId
) => {
  if (io) {
    io.emit("newCommentNotification", {
      message: { _id, userId, userCommented, postProfileId },
    });
  }
};
