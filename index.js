require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(
  "/user",
  userRouter
)(async function () {
  await mongoose.connect(process.env.MONGO_DB_URI);
  app.listen(process.env.PORT, () => {
    console.log("the server is up and listening on Port:", process.env.PORT);
  });
})();
