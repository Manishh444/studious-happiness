const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello again from production in read only mode" });
});

const PORT = process.env.PORT
console.log(PORT)
app.listen(PORT, () => {
  console.log(`server running on $PORT`);
});
