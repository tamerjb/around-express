const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, "..")));
app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`App listiening on port ${PORT}`);
});
