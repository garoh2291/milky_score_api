const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userRouter = require("./routes/users");
const eventRouter = require("./routes/events");
const subRouter = require("./routes/subscribtion");
const checkoutRouter = require("./routes/checkout");
const expressRouter = require("./routes/express");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/sub", subRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/express", expressRouter);
app.use("/api/v1/news", require("./routes/news"));

module.exports = app;
