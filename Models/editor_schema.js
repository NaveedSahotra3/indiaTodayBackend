const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signup_Editor = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetLink: {
      data: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: 1,
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }

  //  {timestamps : true}
);

module.exports = mongoose.model("editor", signup_Editor);
