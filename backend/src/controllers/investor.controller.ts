import { Request, Response } from "express";
import InvestorCategory from "../models/investorRelation.model";
import InvestorReport from "../models/InvestorReport.model";
import OfficeType from "../models/OfficeType.model";
import OfficeLocation from "../models/OfficeLocation.model";

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const categoriesCount = await InvestorCategory.countDocuments();
        const reportsCount = await InvestorReport.countDocuments();
        const officeTypesCount = await OfficeType.countDocuments();
        const locationsCount = await OfficeLocation.countDocuments();

        // Recent 5 reports
        const recentReports = await InvestorReport.find()
            .sort({ uploadedDate: -1 })
            .limit(5)
            .populate("categoryId", "name");

        res.status(200).json({
            counts: {
                categories: categoriesCount,
                reports: reportsCount,
                officeTypes: officeTypesCount,
                locations: locationsCount
            },
            recentReports
        });
    } catch (error) {
        console.error("Stats Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Public: Get Category by Slug and its associated active (or all) reports
export const getCategoryBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const category = await InvestorCategory.findOne({ slug, isActive: true });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Fetch related reports
        // If query param 'admin' is true, fetch all, otherwise only active
        const filter: any = { categoryId: category._id };
        if (req.query.isAdmin !== 'true') {
            filter.isActive = true;
        }

        const reports = await InvestorReport.find(filter).sort({ financialYear: -1, uploadedDate: -1 });

        return res.status(200).json({
            category,
            reports
        });
    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Admin: Create a new report
export const createReport = async (req: Request, res: Response) => {
    try {
        const { categoryId, title, financialYear } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "PDF file is required" });
        }

        // Construct file URL (assuming static serve setup)
        const fileUrl = `/uploads/${file.filename}`;

        const newReport = new InvestorReport({
            categoryId,
            title,
            financialYear,
            fileUrl
        });

        await newReport.save();
        return res.status(201).json(newReport);
    } catch (error) {
        console.error("Error creating report:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Admin: Update a report
export const updateReport = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, financialYear, isActive } = req.body;

        // Note: File update logic usually involves deleting old file, but for simplicity we'll handle metadata or new file if uploaded
        // If a new file is uploaded, we update the url
        const updateData: any = { title, financialYear, isActive };
        if (req.file) {
            updateData.fileUrl = `/uploads/${req.file.filename}`;
        }

        const updatedReport = await InvestorReport.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        return res.status(200).json(updatedReport);
    } catch (error) {
        console.error("Error updating report:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Admin: Delete a report
export const deleteReport = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedReport = await InvestorReport.findByIdAndDelete(id);

        if (!deletedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        // TODO: Optionally delete the file from disk using fs
        return res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Public/Admin: Get all categories (helper for UI)
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await InvestorCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
