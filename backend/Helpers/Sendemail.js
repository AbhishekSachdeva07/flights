import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

const Sendemail = (email,otp)=>{
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
                subject: "OTP for RidexMatch✈️",
                text: "Hello from Utinder",
                html: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>OTP Email</title>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f4f4f4;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    .email-container {
                                        background-color: #ffffff;
                                        margin: 40px auto;
                                        padding: 20px;
                                        border-radius: 10px;
                                        max-width: 600px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    .email-header {
                                        background-color: #4CAF50;
                                        color: #ffffff;
                                        padding: 10px;
                                        text-align: center;
                                        border-radius: 10px 10px 0 0;
                                    }
                                    .email-header h1 {
                                        margin: 0;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        color: #333;
                                    }
                                    .email-body p {
                                        font-size: 16px;
                                        line-height: 1.5;
                                    }
                                    .otp {
                                        background-color: #f0f0f0;
                                        padding: 10px;
                                        text-align: center;
                                        font-size: 22px;
                                        letter-spacing: 2px;
                                        color: #4CAF50;
                                        border-radius: 5px;
                                        margin: 20px 0;
                                        font-weight: bold;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 10px;
                                        font-size: 14px;
                                        color: #888;
                                    }
                                    .email-footer p {
                                        margin: 5px 0;
                                    }
                                    .email-footer a {
                                        color: #4CAF50;
                                        text-decoration: none;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <div class="email-header">
                                        <h1>Your OTP Code</h1>
                                    </div>
                                    <div class="email-body">
                                        <p>Hello,</p>
                                        <p>We received a request to access your account using an OTP. Please use the OTP below to proceed with your login or verification process.</p>
                                        <div class="otp">${otp}</div>
                                        <p>If you did not request this, you can safely ignore this email.</p>
                                        <p>Thank you,</p>
                                        <p>The RidexMatch Team</p>
                                    </div>
                                    <div class="email-footer">
                                        <p>Need help? <a href="#">Contact Support</a></p>
                                        <p>&copy; 2024 RidexMatch. All rights reserved.</p>
                                    </div>
                                </div>
                            </body>
                            </html>`
            });
            console.log("Message sent:", info.messageId);
        } catch (error) {
            console.error("Error sending mail:", error);
        }
    }
    sendMail();
}

export default Sendemail;