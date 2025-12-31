import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        year: {
            type: String,
            default: () => new Date().getFullYear().toString()
        },
        logo: {
            type: String,
            required: true
        },

        countryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country"
        },
        BussnessName: {
            type: String,
            required: true
        },
        userImage: {
            type: String,
            require: true
        },
        description: {
            type: String,
            trim: true
        },

        isOfficial: {
            type: Boolean,
            default: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Partner", partnerSchema);
