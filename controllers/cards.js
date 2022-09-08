const path = require("path");
const Card = require("../models/card");
const { serverError } = require("../utils/consts");

//GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => serverError(res));
};
// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, likes, owner })
    .then((card) => res.status(201).send({ data: card }))
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

const deleteCard = (req, res) => {
  const owner = req.user._id;
  Card.findById(owner)
    .orFail(() => {
      const error = new Error("no Card found for the specifed id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) =>
      Card.deleteOne(card)
        .then(() => res.send({ data: card }))
        .catch((err) => {
          if (err.name === "CastError") {
            res.status(400).send({ message: "Invaild Card ID" });
          } else if (err.statusCode === 404) {
            res.status(404).send({ message: err.message });
          } else {
            res.status(500).send({ message: "An Error Occured" });
          }
        })
    );
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
};
