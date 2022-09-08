const express = require("express");
// const path = require("path");
const mongoose = require("mongoose");
// const mainRouteHandler = require("./routes");

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { pageError } = require("./utils/consts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(cardRouter);
app.use((req, res) => {
  pageError(res);
});
app.use((req, res, next) => {
  req.user = {
    _id: "6319c9505c1f088968e5a308",
  };
  next();
});
// app.use(express.static(path.join(__dirname, "..", "public")));

// app.use(mainRouteHandler);

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
