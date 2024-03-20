require("dotenv").config();

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const cors = require("cors");



const cookieParser = require('cookie-parser');
const express = require("express");
const mongoose = require("mongoose");
const RedisStore =  require('connect-redis').default
const session = require("express-session");

const redis =  require("redis")
const redisClient = redis.createClient({socket:{
  host: 'redis',
  port: 6379,
  // tls: true,
}})
redisClient.connect().catch(console.error)



const postRouter =  require('./routes/postRoutes')
const userRouter = require("./routes/userRoutes")

const app = express();
app.use(express.json())
app.use(cors({}));

// app.use(cookieParser());

// app.use(session({
//   store: new RedisStore({client: redisClient}),
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie:{
//     secure: false,
//     httpOnly: true,
//     maxAge: 30000
//   }
// }))
// Configure session middleware
const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your_secret_key', // Replace with a strong, random secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,} // Set to true for HTTPS in production }
});

app.use(sessionMiddleware);
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
