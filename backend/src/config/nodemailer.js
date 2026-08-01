import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendEmail = async (to, subject, text,html, name, email, Empno) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Employee Account Created",
        html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">Employee Account Created</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your employee account has been successfully created..</p>
        <table border="1" cellpadding="10" cellspacing="0">
            <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
            </tr>
            <tr>
                <td><strong>Employee No</strong></td>
                <td>${Empno}</td>
            </tr>
        </table>
        <br />
        <p>Regards,<br />Admin Team</p>
    </div>
    `
    });
};