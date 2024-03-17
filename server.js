const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello again from production" });
});

app.listen(7000, () => {
  console.log("server running on 7000");
});
