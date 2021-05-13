const mongoose = require("mongoose");

const schema = mongoose.Schema;

const videoArticle = new schema(
  {
    title: {
      type: String,
    },

    image: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
      max: 64,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"categories"
    },
    isFeatured: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("videoArticle", videoArticle);