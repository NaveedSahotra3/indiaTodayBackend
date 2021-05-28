const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Topstory = new schema(
  {
    storytitle: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"subcategories"
    },
    isFeatured: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("topstory", Topstory);
