const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const uri = "mongodb://manish:1234@192.168.64.2:27017/admin";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/", (req, res) => {
  res.json({
    message:
      "hello again from production in read only mode with docker compose with env from docker compose from dev",
  });
});

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`server running on $PORT`);
});
