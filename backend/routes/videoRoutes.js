const express = require("express");
const { uploadVideo, getVideos, getVideoDetails } = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/upload", authMiddleware, uploadVideo);
router.get("/", authMiddleware, getVideos);
router.get("/:id", authMiddleware, getVideoDetails);

module.exports = router;
