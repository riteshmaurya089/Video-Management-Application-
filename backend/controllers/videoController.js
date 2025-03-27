const Video = require("../models/Video");
const multer = require("multer");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage }).single("video");

exports.uploadVideo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "File upload failed" });

    const { title, description, tags } = req.body;
    const video = new Video({
      title,
      description,
      tags: tags.split(","),
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user.userId,
    });

    await video.save();
    res.status(201).json({ message: "Video uploaded successfully", video });
  });
};

exports.getVideos = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  const query = { uploadedBy: req.user.userId };
  if (search) query.title = { $regex: search, $options: "i" };

  const videos = await Video.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(videos);
};

exports.getVideoDetails = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ error: "Video not found" });

  res.json(video);
};
