const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const mainRouteHandler = require("./routes");

const app = express();
mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(mainRouteHandler);

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
