const User = require("../models/user");
const { serverError, userError } = require("../utils/consts");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => serverError(res));
};
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
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
    .then((user) => res.status(201).send({ data: user }))
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

const updateUserData = (req, res) => {
  const id = req.user._id;
  const body = req.body;
  User.findByIdAndUpdate(id, { body }, { new: true })
    .orFail(() => {
      const error = new Error("Invalid user id");

      error.status = 404;

      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "User id is incorrect" });
      } else if (err.status === 404) {
        res.status(404).send({ message: "Invalid user id" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: "Please update these fields" });
  }
  updateUserData(res, req);
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: "Please update avatar" });
  }
  updateUserData(res, req);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
