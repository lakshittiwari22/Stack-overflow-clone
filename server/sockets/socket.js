import { Server } from "socket.io";

let io;

export const initializeWebSocket = (httpServer) => {

  io = new Server(httpServer,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  

  io.on("connection", (socket) => {
    console.log("A user connected:",socket.id);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};

export const emitNewPostNotification = (userPosted) => {
  if (io) {
    io.emit("newPostNotification", { message: userPosted });
  }
};

export const emitNewQuestionNotification = (userPosted) => {
  if (io) {
    io.emit("newQuestionNotification", { message: userPosted });
  }
};
