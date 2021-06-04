const mongoose = require("mongoose");

const schema = mongoose.Schema;

const Footer = new schema(
  {
    footer_position: {
      type: Number,
      enum: [1, 2,3,4,5,6], // 1 << first from R2L, 2 << second from R2L,3 << third from R2F,4 << forth from R2F
      default: 1,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: Number,
      enum: [1, 2], // 1 << Active, 2 << Disable
      default: 1,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("footer", Footer);
