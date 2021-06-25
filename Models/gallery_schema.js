const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Gallery = new schema(
 
 
  {

    id: {
      type: String,
    },
    title: {
      type: String,
    },
 
    image: {
      type: String,
    },
  
  
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Gallery", Gallery);
