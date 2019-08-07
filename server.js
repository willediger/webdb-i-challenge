const express = require("express");

const accountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());
server.use(logger);

server.use("/api/accounts", accountsRouter);

server.use(errHandler);

function errHandler(err, req, res, next) {
  res.status(err.status).json({ message: err.message });
}

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
