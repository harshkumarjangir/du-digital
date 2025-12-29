
import express from "express";
import {
    addSalesExpert,
    getSalesExperts,
    updateSalesExpert,
    deleteSalesExpert
} from "../controllers/salesExpert.controller";

const router = express.Router();

router.post("/", addSalesExpert);
router.get("/", getSalesExperts);
router.put("/:id", updateSalesExpert);
router.delete("/:id", deleteSalesExpert);

export default router;
