import express from "express";
import multer from "multer";
import path from "path";
import {
    getContentSections,
    getContentSectionById,
    createContentSection,
    updateContentSection,
    deleteContentSection
} from "../controllers/contentSection.controller";

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/", getContentSections);
router.get("/:id", getContentSectionById);
router.post("/", upload.single("image"), createContentSection);
router.put("/:id", upload.single("image"), updateContentSection);
router.delete("/:id", deleteContentSection);

export default router;
