const mongoose = require("mongoose");

const schema = mongoose.Schema;

const dish = new schema({
  dishname: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },

  image: {
    type: String,
  },

  price: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },

  description: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },

  ingredients: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },
});

module.exports = mongoose.model("Dish", dish);
