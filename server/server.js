const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const socketServer = require("./socketServer");
const authRoutes = require("./routes/authRoutes");

// Define the port
const PORT = process.env.PORT || process.env.API_PORT;

// Create an Express app
const app = express();

const server = http.createServer(app);
socketServer.registerSocketServer(server);
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB CONNECTION ERR", err);
  });

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const routeFiles = fs.readdirSync("./routes");
routeFiles.forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api", route);
  }
});
