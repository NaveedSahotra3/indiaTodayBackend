const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const signup = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max: 64,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isEditor : {

      type: Boolean,
      default: false
    },
    email: {
      type: String,
      trim: true,
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
);

module.exports = mongoose.model("admin", signup);
