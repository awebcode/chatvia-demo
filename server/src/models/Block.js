const mongoose = require("mongoose");

const BlockedSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  blocked: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Blocked = mongoose.model("Blocked", BlockedSchema);

module.exports = { Blocked };
