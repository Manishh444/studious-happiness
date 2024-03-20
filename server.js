const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const redis =  require("redis")
const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const RedisStore =  require('connect-redis').default
// let RedisStore = require("connect-redis")(session);



require("dotenv").config();

const postRouter =  require('./routes/postRoutes')
const userRouter = require("./routes/userRoutes")

const app = express();
app.use(express.json())
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie:{
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 30000
  }
}))
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

function connectMongo() {
  const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      setTimeout(connectMongo, 5000);
    });
}

connectMongo();

app.get("/", (req, res) => {
  res.json({
    message:
      "hello again from production in read only mode with docker compose with env from docker compose from dev",
  });
});



const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
