const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  friend: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  friendShipStatus: {
    type: String,
    enum: ["pending", "accepted", "deny"],
    default: "accepted",
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Friend = mongoose.model("Friend", FriendSchema);

module.exports = { Friend };
