import express from "express";
import { getAllVideos, createVideo, updateVideo, deleteVideo } from "../controllers/video.controller";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", createVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);

export default router;
