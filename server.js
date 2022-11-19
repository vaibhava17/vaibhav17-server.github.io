const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require('cors');
const db = require("./db.js");

dotenv.config();
db();

const app = express();

app.use(cors());
app.use(express.json());
app.enable('trust proxy');
app.options('*', cors());

app.get("/", (req, res) => {
  res.send("backend server running...");
});

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} on Port: ${PORT}`.yellow)
);

module.exports = { server, app };
