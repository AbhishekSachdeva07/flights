import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const Sendemail = (email,otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    async function sendMail() {
        try {
            const info = await transporter.sendMail({
                from: {
                    name: 'Abhishek Sachdeva',
                    address: 'utinder1@utiner.com'
                },
                to: [email],
                subject: "OTP for UTINDER",
                text: "Hello from Utinder",
                html: `Your OTP is <b>${otp}</b><br><br><b>Regards</b><br>Team UTinder`
            });
            console.log("Message sent:", info.messageId);
        } catch (error) {
            console.error("Error sending mail:", error);
        }
    }
    sendMail();
}

export default Sendemail;