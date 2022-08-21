const mainRouteHandler = require("express").Router();

const usersRouter = require("./users");

mainRouteHandler.use("/", usersRouter);

const cardsRouter = require("./cards");

mainRouteHandler.use("/", cardsRouter);

const routeNotFound = require("./routeNotFound");

mainRouteHandler.use("/", routeNotFound);

module.exports = mainRouteHandler;
