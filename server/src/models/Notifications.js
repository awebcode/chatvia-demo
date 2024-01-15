const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  content: String,

  readStatus: Boolean,

  types: {
    type: String,
    enum: ["newMsg", "friendRequest", "missedCall"],
    default: "newMsg",
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = { Notification };
