import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date
    },
 
    imageUrl: {
        type: String,
        trim: true
    },
  
    isGallery: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
