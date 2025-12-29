import { Request, Response } from "express";
import NewsMedia from "../models/News.model";

// Create News
export const createNews = async (req: Request, res: Response) => {
    try {
        const { title, datePublished, discription, link } = req.body;
        const file = req.file;

        if (!title || !datePublished || !link) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = "";
        if (file) {
            imageUrl = `/uploads/${file.filename}`;
        }

        const newNews = new NewsMedia({
            title,
            datePublished,
            discription,
            link,
            imageUrl
        });

        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        console.error("Create News Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get News (Filter by Year)
export const getNews = async (req: Request, res: Response) => {
    try {
        const { year } = req.query;
        let query: any = {};

        if (year) {
            const startStr = `${year}-01-01T00:00:00.000Z`;
            const endStr = `${year}-12-31T23:59:59.999Z`;
            query.datePublished = {
                $gte: new Date(startStr),
                $lte: new Date(endStr)
            };
        }

        const news = await NewsMedia.find(query).sort({ datePublished: -1 });
        res.status(200).json(news);
    } catch (error) {
        console.error("Get News Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update News
export const updateNews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, datePublished, discription, link } = req.body;
        const file = req.file;

        const updateData: any = {
            title,
            datePublished,
            discription,
            link
        };

        if (file) {
            updateData.imageUrl = `/uploads/${file.filename}`;
        }

        const updatedNews = await NewsMedia.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }

        res.status(200).json(updatedNews);
    } catch (error) {
        console.error("Update News Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete News
export const deleteNews = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedNews = await NewsMedia.findByIdAndDelete(id);

        if (!deletedNews) {
            return res.status(404).json({ message: "News not found" });
        }

        // Optional: Delete file from uploads folder if needed

        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        console.error("Delete News Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
