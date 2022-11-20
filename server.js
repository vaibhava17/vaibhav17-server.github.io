const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require('cors');
const db = require("./db.js");
const { notFound, errorHandler } = require("./middlewares/error.middleware.js");

// Routes
const userRoutes = require("./routes/user.routes.js");
const mailRoutes = require("./routes/mail.routes.js");

dotenv.config();
db();

const app = express();

app.use(cors());
app.use(express.json());
app.enable('trust proxy');
app.options('*', cors());

app.get("/", (req, res) => res.send("backend server running..."));

app.use("/api-v1/user", userRoutes);
app.use("/api-v1/mails", mailRoutes);
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} on Port: ${PORT}`.yellow)
);

module.exports = { server, app };
