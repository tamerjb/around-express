const path = require("path");
const Card = require("../models/card");
const { serverError } = require("../utils/consts");

//GET
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => serverError(res));
};

// const getDataFromFile = require('../utils/files');

// const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

// const getCards = (req, res) => getDataFromFile(dataPath)
//   .then((cards) => res.status(200).send(cards))
//   .catch((err) => res.status(500).send(err));

module.exports = { getCards };
