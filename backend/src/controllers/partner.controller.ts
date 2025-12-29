import { Request, Response } from "express";
import PartnerProgram from "../models/PartnerProgram.model";

export const createPartnerRequest = async (req: Request, res: Response) => {
    try {
        const { fullName, email, phone, lookingFor, city, isMsg } = req.body;

        const newRequest = new PartnerProgram({
            fullName,
            email,
            phone,
            lookingFor,
            city,
            isMsg
        });

        await newRequest.save();
        res.status(201).json({ message: "Partner request submitted successfully", request: newRequest });
    } catch (error) {
        console.error("Create Partner Request Error", error);
        res.status(500).json({ message: "Error submitting request" });
    }
};

export const getPartnerRequests = async (req: Request, res: Response) => {
    try {
        const requests = await PartnerProgram.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (error) {
        console.error("Get Partner Requests Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getPartnerStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalRequests = await PartnerProgram.countDocuments();
        const todayRequests = await PartnerProgram.countDocuments({
            createdAt: { $gte: today }
        });

        res.status(200).json({
            total: totalRequests,
            today: todayRequests
        });
    } catch (error) {
        console.error("Partner Stats Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
