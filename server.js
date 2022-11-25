const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require('cors');
const db = require("./db.js");
const { notFound, errorHandler } = require("./middlewares/error.middleware.js");

// V1 Routes
const v1Routes = require("./routes/v1.routes.js");

dotenv.config();
db();

const app = express();

app.use(cors());
app.use(express.json());
app.enable('trust proxy');
app.options('*', cors());

app.get("/", (req, res) => res.sendFile('public/index.html', {root: __dirname }));
app.get("/api-docs", (req, res) => res.sendFile('public/api.html', {root: __dirname }));
app.use(express.static(__dirname + '/public'));
app.use("/api-v1", v1Routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server started in ${process.env.NODE_ENV} on Port: ${PORT}`.yellow)
);

module.exports = { server, app };
