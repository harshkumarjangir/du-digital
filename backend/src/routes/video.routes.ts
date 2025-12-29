import express from "express";
import { getAllVideos, getVideosByCategory, createVideo, updateVideo, deleteVideo } from "../controllers/video.controller";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/category/:category", getVideosByCategory);
router.post("/", createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;