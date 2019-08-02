const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: { type: String, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Url", urlSchema);
