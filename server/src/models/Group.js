const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: String,

  avatar: String,

  members: [
    {
      member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["member", "admin"],
        default: "member",
      },
    },
  ],

  conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },

  images: [{ type: String }],

  files : [{type : String}]
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = { Group };
