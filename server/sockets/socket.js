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
  userPosted,
  userId,
  userQuestioned,
  userQuestionedId
) => {
  if (io) {
    io.emit("newAnswerNotification", {
      message: { userPosted, userId, userQuestioned, userQuestionedId },
    });
  }
};

export const emitLikeNotification = (userId, userLiked, postProfileId) => {
  if (io) {
    io.emit("likeNotification", {
      message: { userId, userLiked, postProfileId },
    });
  }
};
export const emitUpVoteNotification = (userId, userVoted, userQuestionedId) => {
  if (io) {
    console.log(`socket:${userId}`);
    io.emit("upVoteNotification", {
      message: { userId, userVoted, userQuestionedId },
    });
  }
};
export const emitDownVoteNotification = (userId, userVoted, userQuestionedId) => {
  if (io) {
    io.emit("downVoteNotification", {
      message: { userId,userVoted, userQuestionedId },
    });
  }
};

export const emitNewCommentNotification = (userId, userCommented, postProfileId) => {
  if (io) {
    io.emit("newCommentNotification", {
      message: { userId, userCommented, postProfileId },
    });
  }
};


