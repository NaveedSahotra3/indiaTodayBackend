
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Magzine = new schema(
  {
    title: {
      type: String,
      trim: true,
      max: 64,
    },

    

    image: {
      type: String,
    },

    description: {
      type: String, 
      trim: true,
      max: 64,
    },
    
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Magzine", Magzine);
