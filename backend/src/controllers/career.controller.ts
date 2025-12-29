import { Request, Response } from "express";
import Career from "../models/Careers.model";

// Create Career
export const createCareer = async (req: Request, res: Response) => {
    try {
        const {
            title, location, department, experience,
            jobType, description, responsibilities, qualifications
        } = req.body;

        const newCareer = new Career({
            title,
            location,
            department,
            experience,
            jobType,
            description,
            responsibilities,
            qualifications,
            postedDate: new Date()
        });

        await newCareer.save();
        res.status(201).json(newCareer);
    } catch (error) {
        console.error("Create Career Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Careers
export const getCareers = async (req: Request, res: Response) => {
    try {
        const careers = await Career.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(careers);
    } catch (error) {
        console.error("Get Careers Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Career
export const deleteCareer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Career.findByIdAndDelete(id);
        res.status(200).json({ message: "Career deleted successfully" });
    } catch (error) {
        console.error("Delete Career Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
