const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
  languages: {
    type: String,
    enum: ["vi", "en"],
    default: "english",
  },

  mode: {
    type: String,
    enum: ["dark", "light"],
    default: "english",
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Settings = mongoose.model("Settings", SettingSchema);

module.exports = { Settings };
