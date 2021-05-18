const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Topstory = new schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    status: {
      type: Number,
      enum: [1, 2], // 1 << Active, 2 << Disable
      default: 2,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("header", Topstory);
