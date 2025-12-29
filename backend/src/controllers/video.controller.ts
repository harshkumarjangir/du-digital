import { Request, Response } from "express";
import Video from "../models/Video.model";

// Get all videos
export const getAllVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
    }
};

// Get videos by category with pagination
export const getVideosByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const { limit = 10, skip = 0 } = req.query;

        const videos = await Video.find({ category })
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

        const total = await Video.countDocuments({ category });

        res.status(200).json({
            videos,
            total,
            length: videos.length,
            limit: Number(limit),
            skip: Number(skip)
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos by category", error });
    }
};

// Create a new video
export const createVideo = async (req: Request, res: Response) => {
    try {
        const { title, videoUrl, category, description } = req.body;

        // Basic validation
        if (!title || !videoUrl) {
            return res.status(400).json({ message: "Title and Video URL are required" });
        }

        // Extract thumbnail if it's a YouTube URL (simple version)
        let thumbnailUrl = "";
        const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(youtubeRegex);
        if (match && match[1]) {
            thumbnailUrl = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }

        const newVideo = new Video({
            title,
            videoUrl,
            category,
            description,
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ message: "Error creating video", error });
    }
};

// Update a video
export const updateVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedVideo = await Video.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: "Error updating video", error });
    }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedVideo = await Video.findByIdAndDelete(id);

        if (!deletedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting video", error });
    }
};
