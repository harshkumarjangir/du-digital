import express from "express";
import multer from "multer";
import path from "path";
import { createEvent, getEvents, addEventImages, getEventImages, updateEvent, deleteEvent, getEventById, deleteEventImage } from "../controllers/event.controller";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createEvent);
router.get("/", getEvents);

// Multi-upload route & Image operations
router.post("/:id/images", upload.array("images", 10), addEventImages);
router.get("/:id/images", getEventImages);
router.delete("/images/:id", deleteEventImage);

router.get("/:id", getEventById);
router.put("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

// Multi-upload route


export default router;
