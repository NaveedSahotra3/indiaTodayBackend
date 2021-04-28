const mongoose = require("mongoose");

const schema = mongoose.Schema;

const imageArticle = new schema(
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("imageArticles", imageArticle);
