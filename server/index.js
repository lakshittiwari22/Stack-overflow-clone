import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import socialRoutes from "./routes/socialRoute.js";
import commentRoutes from "./routes/Comment.js";
import { initializeWebSocket } from "./sockets/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
// const server = http.createServer(app);

app.use(express.json({ limit: "100mb", extended: true })); // use to parse data from the body
app.use(express(urlencoded({ limit: "30mb", extended: true })));
app.use(cors());

// Serve your static files from the 'public' directory
app.use(express.static(dirname(__dirname)));

// Set up a route to serve your 'sw.js' file
app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'sw.js'));
});

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone api");
});

app.get("/socket.io/socket.io.js", (req, res) => {
  res.sendFile(__dirname + "/node_modules/socket.io-client/dist/socket.io.js");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/social", socialRoutes);
app.use("/comment", commentRoutes);

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = process.env.CONNECTION_URL;
let server;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      initializeWebSocket(server);
    });

    // Handle process termination (e.g., Ctrl+C)
    process.on("SIGINT", () => {
      console.log("Received SIGINT. Closing server and database connection...");

      // Close the server first
      server.close(() => {
        console.log("Server closed. Closing MongoDB connection...");

        // Close the MongoDB connection
        mongoose.connection.close(() => {
          console.log("MongoDB connection closed. Exiting process...");
          process.exit(0);
        });
      });
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));
