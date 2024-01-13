import { io } from "socket.io-client";

//"https://stack-overflow-clone-server-ebfz.onrender.com"
//"htt p://localhost:5000"
const socket = io( "https://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});
socket.connect();

export default socket;
