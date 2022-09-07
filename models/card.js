const mongoose = require("mongoose");
const { URL_REGEX } = require("../utils/consts");

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The "name" field must be filled in.'],
      minlength: [2, "The minimum length of name is 2"],
      maxlength: [30, "The maximum length of name is 2"],
    },
    link: {
      type: String,
      required: [true, 'The "Link" field must be filled in.'],
      validate: {
        validator(value) {
          return URL_REGEX.test(value);
        },
        message: "Invalid URL",
      },
    },
    owner: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("card", cardsSchema);
