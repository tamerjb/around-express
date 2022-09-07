const mongoose = require("mongoose");
const { URL_REGEX } = require("../utils/consts");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: "Invalid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
