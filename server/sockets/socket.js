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
  userQuestioned
) => {
  if (io) {
    io.emit("newAnswerNotification", {
      message: { userPosted, userId, userQuestioned },
    });
  }
};
