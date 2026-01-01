import { Request, Response } from "express";
import ContentSection from "../models/ContentSection.model";
import Form from "../models/Form.model";

// Get all content sections
export const getContentSections = async (req: Request, res: Response) => {
    try {
        const { formId } = req.query;

        const filter: any = {};
        if (formId) {
            filter.formId = formId;
        }

        const sections = await ContentSection.find(filter)
            .populate('formId', 'name slug')
            .sort({ order: 1 });

        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ message: "Error fetching content sections", error });
    }
};

// Get single content section by ID
export const getContentSectionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const section = await ContentSection.findById(id)
            .populate('formId', 'name slug');

        if (!section) {
            return res.status(404).json({ message: "Content section not found" });
        }

        res.status(200).json(section);
    } catch (error) {
        res.status(500).json({ message: "Error fetching content section", error });
    }
};

// Create a new content section
export const createContentSection = async (req: Request, res: Response) => {
    try {
        const { formId, sectionKey, title, contentHtml, badge, layout, order, isActive } = req.body;

        if (!formId || !sectionKey || !title || !contentHtml) {
            return res.status(400).json({ message: "Form ID, sectionKey, title, and contentHtml are required" });
        }

        // Verify form exists
        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        // Handle image upload
        let imageUrl = req.body.image || '';
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get("host")}/api/uploads/${req.file.filename}`;
        }

        // Get max order for this form
        const maxOrder = await ContentSection.findOne({ formId })
            .sort({ order: -1 })
            .select('order');
        const newOrder = order !== undefined ? order : (maxOrder?.order ?? -1) + 1;

        const newSection = new ContentSection({
            formId,
            sectionKey,
            title,
            contentHtml,
            image: imageUrl,
            badge: badge || {},
            layout: layout || 'LEFT_TEXT_RIGHT_IMAGE',
            order: newOrder,
            isActive: isActive !== undefined ? isActive : true
        });

        const savedSection = await newSection.save();
        const populated = await savedSection.populate('formId', 'name slug');

        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: "Error creating content section", error });
    }
};

// Update a content section
export const updateContentSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // If formId is being updated, verify form exists
        if (updateData.formId) {
            const form = await Form.findById(updateData.formId);
            if (!form) {
                return res.status(404).json({ message: "Form not found" });
            }
        }

        // Handle image upload
        if (req.file) {
            updateData.image = `${req.protocol}://${req.get("host")}/api/uploads/${req.file.filename}`;
        }

        const updatedSection = await ContentSection.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('formId', 'name slug');

        if (!updatedSection) {
            return res.status(404).json({ message: "Content section not found" });
        }

        res.status(200).json(updatedSection);
    } catch (error) {
        res.status(500).json({ message: "Error updating content section", error });
    }
};

// Delete a content section
export const deleteContentSection = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedSection = await ContentSection.findByIdAndDelete(id);

        if (!deletedSection) {
            return res.status(404).json({ message: "Content section not found" });
        }

        res.status(200).json({ message: "Content section deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting content section", error });
    }
};
