import express from "express";
import {
    getOfficeTypes,
    createOfficeType,
    deleteOfficeType,
    getLocations,
    createLocation,
    deleteLocation,
    getGroupedOffices
} from "../controllers/office.controller";

const router = express.Router();

// Office Types
router.get("/types", getOfficeTypes);
router.post("/types", createOfficeType);
router.delete("/types/:id", deleteOfficeType);

// Office Locations
router.get("/locations", getLocations);
router.get("/locations/grouped", getGroupedOffices);
router.post("/locations", createLocation);
router.delete("/locations/:id", deleteLocation);

export default router;
