import { Request, Response } from "express";
import TravelInquiry from "../models/Travelinquery.model"
import OtpSchema from "../models/Otp.model";

// Create a new travel inquiry
export const createTravelInquiry = async (req: Request, res: Response) => {
    try {
        const { name, email, mobileNumber, adult, child, infant, travelDate, packageId,otp } = req.body;

        if (!name || !email || !mobileNumber || !travelDate || !packageId||!otp) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // const newInquiry = new TravelInquiry({
        //     name,
        //     email,
        //     mobileNumber,
        //     adult,
        //     child,
        //     infant,
        //     travelDate,
        //     packageId
        // });
  // Create form submission
        const otp2 = await OtpSchema.findOne({
            mobile: mobileNumber,
            otp: otp,
            $or: [
                { createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } },
                { updatedAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } }
            ]
        })
        if (!otp2) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        await OtpSchema.deleteOne({
            mobile: mobileNumber,
            otp: otp
        })
        // await newInquiry.save();
        res.status(201).json({ message: "Travel inquiry submitted successfully" });
    } catch (error) {
        console.error("Create Travel Inquiry Error", error);
        res.status(500).json({ message: "Error submitting travel inquiry" });
    }
};

// Get all travel inquiries (for admin)
export const getAllTravelInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await TravelInquiry.find()
            .populate("packageId", "title startingPrice")
            .sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        console.error("Get Travel Inquiries Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get travel inquiry stats (for dashboard)
export const getTravelInquiryStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalInquiries = await TravelInquiry.countDocuments();
        const todayInquiries = await TravelInquiry.countDocuments({
            createdAt: { $gte: today }
        });

        res.status(200).json({
            total: totalInquiries,
            today: todayInquiries
        });
    } catch (error) {
        console.error("Travel Inquiry Stats Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
