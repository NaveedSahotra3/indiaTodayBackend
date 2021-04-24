const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Topstory = new schema({
  storytitle: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },

  image: {
    type: String,
  },


  description: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },


});

module.exports = mongoose.model("Topstory", Topstory);
