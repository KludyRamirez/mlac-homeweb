const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

// Create an Express app
const app = express();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.error("DB CONNECTION ERR", err);
  });

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use("/api/auth", authRoutes);

const routeFiles = fs.readdirSync("./routes");
routeFiles.forEach((file) => {
  if (file.endsWith(".js")) {
    const route = require(`./routes/${file}`);
    app.use("/api", route);
  }
});

// Define the port
const port = process.env.PORT || 5002;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
