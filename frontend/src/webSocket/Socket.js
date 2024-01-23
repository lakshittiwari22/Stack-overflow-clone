import { io } from "socket.io-client";

//"https://stack-overflow-clone-server-3-21se.onrender.com"
//"http://localhost:5000"
const socket = io( "https://stack-overflow-clone-server-3-21se.onrender.com", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});
socket.connect();

export default socket;
