import { Request, Response } from "express";
import TeamMember from "../models/TeamMember.model";

// Get all team members (optional grouping)
export const getAllTeamMembers = async (req: Request, res: Response) => {
    try {
        const { groupBy } = req.query;

        const members = await TeamMember.find().sort({ createdAt: -1 });

        if (groupBy === 'category') {
            const grouped = members.reduce((acc: any, member) => {
                const category = member.category || 'Uncategorized';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(member);
                return acc;
            }, {});
            return res.status(200).json(grouped);
        }

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team members", error });
    }
};

// Create a new team member
export const createTeamMember = async (req: Request, res: Response) => {
    try {
        const { name, designation, profileImage, description, category } = req.body;

        if (!name || !designation) {
            return res.status(400).json({ message: "Name and Designation are required" });
        }

        const newMember = new TeamMember({
            name,
            designation,
            profileImage,
            description,
            category
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: "Error creating team member", error });
    }
};

// Update a team member
export const updateTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedMember = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: "Error updating team member", error });
    }
};

// Delete a team member
export const deleteTeamMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedMember = await TeamMember.findByIdAndDelete(id);

        if (!deletedMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting team member", error });
    }
};
