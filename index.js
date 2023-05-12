require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors({origin: 'https://match-with-spongebob.netlify.app'}));
app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("the server is up and listening on Port:", process.env.PORT);
  });
});
