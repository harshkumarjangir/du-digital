import { Router } from "express";
import { sendOtp } from "../utils/sms";
import OtpSchema from "../models/Otp.model"

const otpRoutes = Router();
otpRoutes.post("/send", async (req, res) => {
    try {
        const { mobile } = req.body;
        const otp = Math.floor(100000 + Math.random() * 9000000).toString();
        await sendOtp(mobile, otp);
        await OtpSchema.updateOne({
            mobile: mobile
        }, {
            otp: otp,
            mobile: mobile
        }, { upsert: true })

        res.json({ success: true });
    } catch (error: any) {
        res.json({ sucess: false, massgae: error.massgae })
    }
});
export default otpRoutes