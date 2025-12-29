import { Request, Response } from "express";
import Event from "../models/event.model";
import EventImage from "../models/eventImages.model";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, date } = req.body;
        const file = req.file;

        if (!title || !date) {
            return res.status(400).json({ message: "Title and Date are required" });
        }

        let imageUrl = "";
        if (file) {
            imageUrl = `/uploads/${file.filename}`;
        }

        const newEvent = new Event({
            title,
            date,
            imageUrl,
            isGallery: true // Default to true as per user intent
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Create Event Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Events
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.find().sort({ date: -1 });
        res.status(200).json(events);
    } catch (error) {
        console.error("Get Events Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Add Event Images (Multi Upload)
export const addEventImages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No images uploaded" });
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const imagePromises = files.map(file => {
            const newImage = new EventImage({
                event: id,
                fileUrl: `/uploads/${file.filename}`
            });
            return newImage.save();
        });

        const savedImages = await Promise.all(imagePromises);
        res.status(201).json(savedImages);
    } catch (error) {
        console.error("Add Event Images Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get Event Images
export const getEventImages = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const images = await EventImage.find({ event: id });
        res.status(200).json(images);
    } catch (error) {
        console.error("Get Event Images Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};
