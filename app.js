var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var cors = require("cors");

var usersRouter = require("./routes/users");
var messagesRouter = require("./routes/messages");
var chatsRouter = require("./routes/chats");
var chatlistRouter = require("./routes/chatlist");
var getUsersRouter = require("./routes/getusers");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/chatlist", chatlistRouter);
app.use("/api/getusers", getUsersRouter);
app.use("/api/", (req, res) => {
  res.send("Hello World!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "error" });
});

module.exports = app;
