const { phone } = require("faker");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guest = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("guest", guest);
