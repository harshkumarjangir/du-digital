import express from "express";
import {
    getForms,
    getFormById,
    getFormBySlug,
    createForm,
    updateForm,
    deleteForm
} from "../controllers/form.controller";

const router = express.Router();

router.get("/", getForms);
router.get("/slug/:slug", getFormBySlug);
router.get("/:id", getFormById);
router.post("/", createForm);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;
