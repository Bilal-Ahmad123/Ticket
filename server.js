const express = require("express");
const app = express();
const connectDatabase = require("./mongoConnect");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require("dotenv").config({ path: require("find-config")(".env") });
const cookieParser = require("cookie-parser");
const userSockets = new Map();
const jwt = require("jsonwebtoken");

//Route Imports
const userRoute = require("./Routes/user");
const messageRoute = require("./Routes/messages");

const User = require("./Models/User");

connectDatabase();

//Middlewares
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

//Error Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  console.log(err);
  res.status(err.statusCode).json({
    message: err.message,
  });
});

//Socket Connection

io.on("connection", (socket) => {
  console.log("user connected");

  const token = socket.handshake.query.token;
  var user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
    userSockets.set(user, socket.id);
  } catch (err) {
    console.log(err.message);
  }

  if (user.role == "admin") {
    socket.on("create-conversation", async ({ reciever }) => {
      const user = await User.findById(reciever);
      user.adminChat = true;
      await user.save();
    });
  }

  socket.on("disconnect", () => {
    console.log("disconnected");

    for (let [key, value] of userSockets.entries()) {
      if (value == socket.id) {
        userSockets.delete(key);
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
