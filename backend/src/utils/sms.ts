import axios from "axios";

export async function sendOtp(mobile: string, otp: string) {
    const url = `https://mobicomm.dove-sms.com//submitsms.jsp?user=DUDigi&key=b70b24ab5fXX&mobile=${String(mobile.replace("+91",""))}&message=${otp} is your verification code for your enquiry with DU Global. Valid for 10 minutes. Please do not share this OTP. Team DUDigital Global Ltd&senderid=INFOSM&accusage=1&entityid=1234567891112131415&tempid=1034567891112131819`;

  
    try {
        const response = await axios.get(url);
    if(!response.data.includes("InvalidMobileNumber")){
        return true;
    }else{
        return false;
    }
    } catch (error: any) {
        console.error("SMS Failed:", error.message);
        return false;
    }
}

