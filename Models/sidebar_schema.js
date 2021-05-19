const mongoose = require("mongoose");

const schema = mongoose.Schema;

const SideBar = new schema(
  {
    sidebar_position: {
      type: Number,
      enum: [1,2,3,4], // 1 << Top first, 2 << Top Second,3 << Top Third ,4 << Top Forth
      default: 1,
    },
    description: {
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

module.exports = mongoose.model("sidebar", SideBar);
