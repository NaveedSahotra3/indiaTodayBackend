const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Categories = new schema(
  {
    category_name: {
      type: String,
      trim: true,
      max: 64,
    },
    sub_category_name: {
      type: String,
      trim: true,
      max: 64,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("subcategories", Categories);
