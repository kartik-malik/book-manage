require("dotenv").config();

const express = require("express");
const app = express();
const port = 8081;

const cors = require("cors");
const errorHandler = require("./middlewares/error");
const authRoutes = require("./routes/auth");
const db = require("./models/index");
const bookRoutes = require("./routes/book");
app.use(cors());
app.use(express.json({ urlencoded: true }));
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);
app.listen(port, () => {
  console.log("Server started");
});
