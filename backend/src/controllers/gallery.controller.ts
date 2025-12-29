import { Request, Response } from "express";
import Gallery from "../models/Gallery.model";

// Upload Image
export const uploadImage = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const fileUrl = `/uploads/${file.filename}`;

        const newImage = new Gallery({
            FileUser: fileUrl
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        console.error("Upload Gallery Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Images
export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Image
export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Gallery.findByIdAndDelete(id);
        // TODO: Remove file from disk
        res.status(200).json({ message: "Image deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
