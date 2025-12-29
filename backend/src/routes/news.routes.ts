import express from "express";
import multer from "multer";
import path from "path";
import { createNews, getNews, updateNews, deleteNews } from "../controllers/news.controller";

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

router.post("/", upload.single("image"), createNews);
router.get("/", getNews);
router.put("/:id", upload.single("image"), updateNews);
router.delete("/:id", deleteNews);

export default router;

