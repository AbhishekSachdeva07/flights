import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const flightaccepted = (email)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
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
                subject: "User Accepted❤️✈️",
                text: "Hello from Utinder",
                html: `Your request to join the flight members for cab services have been accepted. Hope you find the match.❤️✈️`
            });
            console.log("Message sent:", info.messageId);
        } catch (error) {
            console.error("Error sending mail:", error);
        }
    }
    sendMail();
}

export default flightaccepted;