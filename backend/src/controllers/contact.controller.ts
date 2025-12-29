import { Request, Response } from "express";
import ContactInquiry from "../models/Contact.model";

export const createInquiry = async (req: Request, res: Response) => {
    try {
        const { fullName, email, phone, message, AllowMsg } = req.body;

        const newInquiry = new ContactInquiry({
            fullName,
            email,
            phone,
            message,
            AllowMsg
        });

        await newInquiry.save();
        res.status(201).json({ message: "Inquiry submitted successfully", inquiry: newInquiry });
    } catch (error) {
        console.error("Create Inquiry Error", error);
        res.status(500).json({ message: "Error submitting inquiry" });
    }
};

export const getInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error("Get Inquiries Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getInquiryStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalInquiries = await ContactInquiry.countDocuments();
        const todayInquiries = await ContactInquiry.countDocuments({
            createdAt: { $gte: today }
        });

        res.status(200).json({
            total: totalInquiries,
            today: todayInquiries
        });
    } catch (error) {
        console.error("Inquiry Stats Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
