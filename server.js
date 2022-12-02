const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// Init Middleware

app.use(express.json({ extended: false }));

const connectDB = require("./config/db");

// Connect DB
connectDB();

// Import routers
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const postsRouter = require("./routes/api/posts");

// Use Routers
app.use(usersRouter);
app.use(authRouter);
app.use(profileRouter);
app.use(postsRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Home");
});

// 404 request
app.get("*", (req, res) => {
  res.status(404).send('Page was not found<a href="/"> Back Home page</a>');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
