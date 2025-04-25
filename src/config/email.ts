import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface ISendEmail {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ to, subject, body }: ISendEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail send');
  } catch (error) {
    console.error('Erro sending e-mail:', error);
  }
};
