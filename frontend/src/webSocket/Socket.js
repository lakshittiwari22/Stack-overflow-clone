import { io } from "socket.io-client";

//"https://stack-overflow-clone-server-ebfz.onrender.com"
//"http://localhost:5000"
const socket = io( "http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});
socket.connect();

export default socket;
