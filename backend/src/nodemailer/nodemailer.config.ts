import 'dotenv/config'

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail({
  sendTo,
  subject,
  html,
  replyTo,
}: {
  sendTo: string;
  subject: string;
  html?: string;
  replyTo?: string;
}) {
   try {
    await transporter.verify();

    const mailOptions = {
      from:`Rikha  <${process.env.RIKHA_EMAIL}>`,
      to: sendTo,
      subject,
      html: html || ' ',
      replyTo: replyTo  || undefined,
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent' , info.messageId)

   } catch(err) {
      console.error('Failed to send email' , err)
   }
}
