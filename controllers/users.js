const user = require("../models/user");
const User = require("../models/user");
const { serverError, userError } = require("../utils/consts");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => serverError(res));
};
const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id);
  orFail(() => {
    const error = new Error("User Not Found");
    error.status = 404;
    throw error;
  })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send("Invalid User");
      } else if (err.type === 404) {
        res.status(404).send({ message: err.message });
      } else {
        serverError(res);
      }
    });
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(", ")}`,
        });
      } else {
        serverError(res);
      }
    });
};

module.exports = { getUsers, getUser, createUser };
