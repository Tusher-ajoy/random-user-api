const express = require("express");
const userRouter = require("./router/v1/user.router");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, it's working");
});

app.use("/api/v1/user", userRouter);

app.all("*", (req, res) => {
  res.send("No router found.");
});

app.listen(process.env.PORT || port);
