import express from "express";
import multer from "multer";
import path from "path";
import { uploadImage, getImages, deleteImage } from "../controllers/gallery.controller";

const router = express.Router();

// Multer Config (Reuse if possible, but defining here for clarity)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/", getImages);
router.post("/", upload.single("image"), uploadImage);
router.delete("/:id", deleteImage);

export default router;
