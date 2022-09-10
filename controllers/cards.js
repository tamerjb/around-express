const Card = require("../models/card");
const { serverError } = require("../utils/consts");

//GET

const getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => serverError(res));
};
// POST
const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const _id = req.user._id;

  Card.create({ name, link, likes, owner: _id })
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
  const { cardId } = req.params;
  Card.findById(cardId)
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
const updateLikes = (req, res, operator) => {
  const cardId = req.params.cardId;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId, // searches for the card on the database
    { [operator]: { likes: userId } }, // $pull / $addToSet
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Card is not found");
      error.status = 404;

      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Card id is incorrect" });
      } else if (err.status === 404) {
        res.status(404).send({ message: "Invalid user id" });
      } else {
        res.status(500).send({ message: "Something went wrong" });
      }
    });
};

const likeCard = (req, res) => updateLikes(req, res, $addToSet);

const unlikeCard = (req, res) => updateLikes(req, res, $pull);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
