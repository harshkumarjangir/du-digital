import express from "express";
import { createPartnerRequest, getPartnerRequests, getPartnerStats } from "../controllers/partner.controller";

const router = express.Router();

router.post("/", createPartnerRequest);
router.get("/", getPartnerRequests);
router.get("/stats", getPartnerStats);

export default router;
