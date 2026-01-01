import { Request, Response } from "express";
import Form from "../models/Form.model";
import FormField from "../models/FormField.model";
import DocumentRequirement from "../models/Documents.model";
import FAQ from "../models/FAQ.model";
import ContentSection from "../models/ContentSection.model";
import PricingPlan from "../models/PricingPlan.model";

// Get form by slug with all related data
export const getFormBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const form = await Form.findOne({ slug });

        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        const formId = form._id;

        // Fetch all related data in parallel
        const [fields, documents, faqs, contentSections, pricingPlans] = await Promise.all([
            FormField.find({ formId }).sort({ order: 1 }),
            DocumentRequirement.find({ formId, isActive: true }).sort({ order: 1 }),
            FAQ.find({ formId, isActive: true }).sort({ order: 1 }),
            ContentSection.find({ formId, isActive: true }).sort({ order: 1 }),
            PricingPlan.find({ formId, isActive: true }).sort({ order: 1 })
        ]);

        // Group content sections by sectionKey
        const groupedContentSections: { [key: string]: any[] } = {};
        contentSections.forEach((section: any) => {
            const key = section.sectionKey;
            if (!groupedContentSections[key]) {
                groupedContentSections[key] = [];
            }
            groupedContentSections[key].push(section);
        });

        res.status(200).json({
            ...form.toObject(),
            fields,
            documents,
            faqs,
            contentSections: groupedContentSections,
            pricingPlans
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching form data", error });
    }
};
// Get all forms
export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });

        // Get field count for each form
        const formsWithFieldCount = await Promise.all(
            forms.map(async (form) => {
                const fieldCount = await FormField.countDocuments({ formId: form._id });
                return {
                    ...form.toObject(),
                    fieldCount
                };
            })
        );

        res.status(200).json(formsWithFieldCount);
    } catch (error) {
        res.status(500).json({ message: "Error fetching forms", error });
    }
};

// Get single form by ID with its fields
export const getFormById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const form = await Form.findById(id);

        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        const fields = await FormField.find({ formId: id }).sort({ order: 1 });

        res.status(200).json({
            ...form.toObject(),
            fields
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching form", error });
    }
};

// Create a new form with fields
export const createForm = async (req: Request, res: Response) => {
    try {
        const { name, slug, description, isActive, fields } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Form name is required" });
        }

        // Generate slug if not provided
        const formSlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        // Create the form
        const newForm = new Form({
            name,
            slug: formSlug,
            description,
            isActive: isActive !== undefined ? isActive : true
        });

        const savedForm = await newForm.save();

        // Create fields if provided
        if (fields && Array.isArray(fields) && fields.length > 0) {
            const formFields = fields.map((field: any, index: number) => ({
                formId: savedForm._id,
                label: field.label,
                name: field.name,
                type: field.type,
                placeholder: field.placeholder,
                options: field.options || [],
                required: field.required || false,
                order: field.order !== undefined ? field.order : index,
                isActive: field.isActive !== undefined ? field.isActive : true
            }));

            await FormField.insertMany(formFields);
        }

        // Fetch the form with fields
        const fieldsData = await FormField.find({ formId: savedForm._id }).sort({ order: 1 });

        res.status(201).json({
            ...savedForm.toObject(),
            fields: fieldsData
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating form", error });
    }
};

// Update a form and its fields
export const updateForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, slug, description, isActive, fields } = req.body;

        // Update form
        const updatedForm = await Form.findByIdAndUpdate(
            id,
            { name, slug, description, isActive },
            { new: true }
        );

        if (!updatedForm) {
            return res.status(404).json({ message: "Form not found" });
        }

        // Update fields if provided
        if (fields && Array.isArray(fields)) {
            // Get existing field IDs
            const existingFields = await FormField.find({ formId: id });
            const existingFieldIds = existingFields.map(f => f._id.toString());

            // Track which fields are in the update
            const updatedFieldIds: string[] = [];

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                const fieldData = {
                    formId: id,
                    label: field.label,
                    name: field.name,
                    type: field.type,
                    placeholder: field.placeholder,
                    options: field.options || [],
                    required: field.required || false,
                    order: field.order !== undefined ? field.order : i,
                    isActive: field.isActive !== undefined ? field.isActive : true
                };

                if (field._id) {
                    // Update existing field
                    await FormField.findByIdAndUpdate(field._id, fieldData);
                    updatedFieldIds.push(field._id);
                } else {
                    // Create new field
                    const newField = await FormField.create(fieldData);
                    updatedFieldIds.push(newField._id.toString());
                }
            }

            // Delete fields that are no longer in the update
            const fieldsToDelete = existingFieldIds.filter(id => !updatedFieldIds.includes(id));
            if (fieldsToDelete.length > 0) {
                await FormField.deleteMany({ _id: { $in: fieldsToDelete } });
            }
        }

        // Fetch the updated form with fields
        const fieldsData = await FormField.find({ formId: id }).sort({ order: 1 });

        res.status(200).json({
            ...updatedForm.toObject(),
            fields: fieldsData
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating form", error });
    }
};

// Delete a form and its fields
export const deleteForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedForm = await Form.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({ message: "Form not found" });
        }

        // Delete associated fields
        await FormField.deleteMany({ formId: id });

        res.status(200).json({ message: "Form and its fields deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting form", error });
    }
};
