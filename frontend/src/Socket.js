import { io } from "socket.io-client";

//"https://stack-overflow-clone-server-ebfz.onrender.com"
//"http://localhost:5000"
const socket = io("http://localhost:5000");
socket.connect();

export default socket;
