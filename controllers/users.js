const path = require("path");
const getDataFromFile = require("../utils/files");

const dataPath = path.join(__dirname, "..", "data", "users.json");

const getUsers = (req, res) =>
  getDataFromFile(dataPath)
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));

const getProfile = (req, res) =>
  getDataFromFile(dataPath)
    .then((users) => users.find(user._id == req.params.id))
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: `There is no user with id of ${req.params.id}` });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(400));

module.exports = { getUsers };
