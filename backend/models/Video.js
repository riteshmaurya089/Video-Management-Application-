const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", VideoSchema);
