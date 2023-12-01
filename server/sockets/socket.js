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

export const emitNewPostNotification = () => {
  if (io) {
    io.emit("newPostNotification", { message: "New post available!" });
  }
};
