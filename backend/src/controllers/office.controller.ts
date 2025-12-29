import { Request, Response } from "express";
import OfficeType from "../models/OfficeType.model";
import OfficeLocation from "../models/OfficeLocation.model";

// --- Office Types ---

export const getOfficeTypes = async (req: Request, res: Response) => {
    try {
        const types = await OfficeType.find({ isActive: true });
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createOfficeType = async (req: Request, res: Response) => {
    try {
        const { name, code, description } = req.body;
        const newType = new OfficeType({ name, code, description });
        await newType.save();
        res.status(201).json(newType);
    } catch (error) {
        res.status(500).json({ message: "Error creating office type" });
    }
};

export const deleteOfficeType = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await OfficeType.findByIdAndDelete(id);
        res.status(200).json({ message: "Office type deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting office type" });
    }
};

// --- Office Locations ---

export const getLocations = async (req: Request, res: Response) => {
    try {
        // Optional filter by type
        const { typeId } = req.query;
        const filter: any = { isActive: true };
        if (typeId) filter.officeTypeId = typeId;

        const locations = await OfficeLocation.find(filter).populate("officeTypeId");
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const createLocation = async (req: Request, res: Response) => {
    try {
        const { officeTypeId, officeName, address, contact } = req.body;
        const newLocation = new OfficeLocation({
            officeTypeId,
            officeName,
            address,
            contact
        });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        console.error("Create Location Error", error);
        res.status(500).json({ message: "Error creating location" });
    }
};

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await OfficeLocation.findByIdAndDelete(id);
        res.status(200).json({ message: "Location deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting location" });
    }
};

export const getGroupedOffices = async (req: Request, res: Response) => {
    try {
        const locations = await OfficeLocation.find({ isActive: true }).populate("officeTypeId");

        const indiaOffices = locations.filter(loc =>
            loc.address?.country?.trim().toLowerCase() === 'india'
        );

        const internationalOffices = locations.filter(loc =>
            loc.address?.country?.trim().toLowerCase() !== 'india'
        );

        res.status(200).json({
            india: indiaOffices,
            international: internationalOffices
        });
    } catch (error) {
        console.error("Grouped Offices Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
