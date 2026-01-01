import mongoose from "mongoose";

const formFieldSchema = new mongoose.Schema(
    {
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Form",
            required: true
        },

        label: {
            type: String,
            required: true
            // "Full Name", "Mobile Number"
        },

        name: {
            type: String,
            required: true
            // "fullName", "mobile"
        },

        type: {
            type: String,
            enum: [
                "text",
                "email",
                "number",
                "date",
                "select",
                "textarea",
                "checkbox",
                "radio"
            ],
            required: true
        },

        placeholder: String,

        options: [
            {
                label: String,
                value: String
            }
        ], // only for select / radio

        required: {
            type: Boolean,
            default: false
        },

        order: {
            type: Number,
            default: 0
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("FormField", formFieldSchema);
