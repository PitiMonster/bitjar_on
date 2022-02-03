"use strict";
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

// GLOBAL UNCAUGHT ERROR HANLDERS

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED ERROR");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// Constants
const port = process.env.PORT || 8080;

const server = app.listen(port, async () => {
//   await runSchedulers();
  console.log(`App running on port ${port}`);
});
// runSockets(server);