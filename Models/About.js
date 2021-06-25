const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AboutCrud = new schema(
  {
    

    description: {
      type: String,
      required: false,
    },
  
   
  
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("about", AboutCrud);
