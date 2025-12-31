import { Request, Response } from "express";
import Event from "../models/event.model";
import EventImage from "../models/eventImages.model";
import fs from "fs";
import path from "path";

// Create Event
export const createEvent = async (req: Request, res: Response) => {
    try {
        const { title, date, location, description } = req.body;
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
            location,
            description,
            imageUrl,
            isGallery: true
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

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, date, location, description } = req.body;
        const file = req.file;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.title = title || event.title;
        event.date = date || event.date;
        event.location = location || event.location;
        event.description = description || event.description;

        if (file) {
            // Delete old image if exists
            if (event.imageUrl) {
                const oldImagePath = path.join(__dirname, "../../", event.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            event.imageUrl = `/uploads/${file.filename}`;
        }

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.error("Update Event Error", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Delete event image
        if (event.imageUrl) {
            const imagePath = path.join(__dirname, "../../", event.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete associated gallery images
        const galleryImages = await EventImage.find({ event: id });
        galleryImages.forEach(img => {
            const imgPath = path.join(__dirname, "../../", img.fileUrl);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        });
        await EventImage.deleteMany({ event: id });

        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Delete Event Error", error);
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
