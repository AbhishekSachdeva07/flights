import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const cabRejected = (email, username) => {
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
                subject: "Cab Booking Rejected 🚫",
                text: "Hello from Utinder",
                html: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Cab Booking Rejected 🚫</title>
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
                                        background-color: #dc3545;
                                        color: #ffffff;
                                        padding: 20px;
                                        text-align: center;
                                        border-radius: 10px 10px 0 0;
                                    }
                                    .email-header h1 {
                                        margin: 0;
                                        font-size: 28px;
                                    }
                                    .email-body {
                                        padding: 20px;
                                        color: #333;
                                    }
                                    .email-body h2 {
                                        color: #dc3545;
                                        font-size: 22px;
                                    }
                                    .email-body p {
                                        font-size: 16px;
                                        line-height: 1.5;
                                    }
                                    .cta-button {
                                        display: inline-block;
                                        margin-top: 20px;
                                        padding: 15px 30px;
                                        background-color: #007bff;
                                        color: #ffffff;
                                        text-decoration: none;
                                        border-radius: 5px;
                                        font-size: 16px;
                                    }
                                    .cta-button:hover {
                                        background-color: #0056b3;
                                    }
                                    .email-footer {
                                        text-align: center;
                                        padding: 20px;
                                        font-size: 14px;
                                        color: #888;
                                    }
                                    .email-footer p {
                                        margin: 5px 0;
                                    }
                                    .email-footer a {
                                        color: #007bff;
                                        text-decoration: none;
                                    }
                                    .emoji {
                                        font-size: 20px;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="email-container">
                                    <!-- Email Header -->
                                    <div class="email-header">
                                        <h1>Cab Booking Rejected 🚫</h1>
                                    </div>

                                    <!-- Email Body -->
                                    <div class="email-body">
                                        <h2>Dear ${username},</h2>
                                        <p>We're sorry to inform you that your <strong>cab booking request</strong> has been rejected.</p>
                                        <p>Unfortunately, due to certain circumstances, we are unable to process your cab booking at this time.</p>
                                        <p>You can try booking another cab or contact our support team if you need further assistance.</p>

                                        <a href="https://ridexmatch.vercel.app" class="cta-button">Try Again</a>

                                        <p>We apologize for the inconvenience and hope to serve you in the future.</p>

                                        <p>Best regards,<br>
                                        The RidexMatch Team</p>
                                    </div>

                                    <!-- Email Footer -->
                                    <div class="email-footer">
                                        <p>Need help? <a href="mailto:utinder1@gmail.com">Contact Support</a></p>
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

export default cabRejected;
