require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router");
const PORT = process.env.PORT || 6111;

const app = express();

app.use(express.json());
app.use("/api", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://qwerty:123@cluster0.wdh0ch4.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
