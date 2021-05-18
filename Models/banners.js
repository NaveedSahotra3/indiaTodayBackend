const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Banners = new schema(
  {
    title: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
    article_name: {
      type: String,
      required: true,
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imageArticles",
    },
    image: {
      type: String,
      required: false,
    },

    // banner_type: {
    //   type: Number,
    //   enum: [1, 2, 3], // 1-> Dont Miss at Landing page , 2-> Today's Special, 3-> Photos
    //   default: 1,
    // },
    // isFeatured: {
    //   type: Boolean,
    //   required: false,
    //   default: false,
    // },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("banners", Banners);
