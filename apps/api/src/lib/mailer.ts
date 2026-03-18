import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_HOST) {
    console.log('[Email] SMTP not configured — skipping email:', options.subject);
    return null;
  }

  return transporter.sendMail({
    from: `"Knit Tech Health" <${process.env.SMTP_USER}>`,
    ...options,
  });
}
