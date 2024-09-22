import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const Welcomemail = (email,username)=>{
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
                subject: `${username} ❤️✈️`,
                text: "Hello from Utinder",
                html: `<!DOCTYPE html>
                            <html lang="en">
                            <body>
                                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; font-family: Arial, sans-serif;">
                                <h1 style="background-color: #007bff; color: #fff; text-align: center; padding: 20px;">Welcome to RidexMatch</h1>
                                <h2 style="color: #007bff;">Dear ${username},</h2>
                                <p>Thank you for joining <strong>RidexMatch</strong>, your ultimate destination for flights and taxi services. Whether you're booking your next flight or arranging a smooth taxi ride, we’ve got you covered.</p>
                                <p>Start exploring and make your travel plans easier with us.</p>
                                <a href="https://ridexmatch.vercel.app" style="display: inline-block; padding: 15px 30px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Start Your Journey</a>
                                <p>We look forward to being part of your travel plans!</p>
                                <p>Best regards,<br>RidexMatch Team</p>
                                <footer style="text-align: center; padding: 20px; font-size: 14px; color: #888;">
                                    <p>Need help? <a href="mailto:utinder1@gmail.com" style="color: #007bff;">Contact Support</a></p>
                                    <p>&copy; 2024 RidexMatch. All rights reserved.</p>
                                </footer>
                                </div>
                            </body>
                            </html>
`
            });
            console.log("Message sent:", info.messageId);
        } catch (error) {
            console.error("Error sending mail:", error);
        }
    }
    sendMail();
}

export default Welcomemail;