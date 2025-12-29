import express from "express";
import { createCareer, getCareers, deleteCareer } from "../controllers/career.controller";

const router = express.Router();

router.post("/", createCareer);
router.get("/", getCareers);
router.delete("/:id", deleteCareer);

export default router;
