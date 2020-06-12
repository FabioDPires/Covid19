const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
    },
    date: { type: Date, default: Date.now },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
