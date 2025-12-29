import mongoose from "mongoose";

const partnerProgramSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    lookingFor: {
        type: String,
        required: false
    },
  
    city: {
        type: String,
        trim: true
    },

    isMsg: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("PartnerProgram", partnerProgramSchema);
