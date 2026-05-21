import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendMail(options: { to: string; subject: string; html: string }) {
  if (!process.env.SMTP_HOST) {
    console.log('[Email] SMTP not configured — skipping:', options.subject);
    return null;
  }
  return transporter.sendMail({ from: `"KTI Health" <${process.env.SMTP_USER}>`, ...options });
}

const VENDOR_EMAIL = process.env.VENDOR_EMAIL || 'info@knittechhealth.com';

export async function sendVendorOrderNotification(order: {
  id: string; firstName: string; lastName: string; email: string; phone: string;
  organization: string | null; message: string | null; product: { name: string; slug: string };
}) {
  return sendMail({
    to: VENDOR_EMAIL,
    subject: `New Equipment Request — ${order.product.name}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#1a365d">New Equipment Request</h2>
      <p>A new inquiry for <strong>${order.product.name}</strong>.</p>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">ID</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${order.id}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${order.firstName} ${order.lastName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${order.email}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Phone</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${order.phone}</td></tr>
        ${order.organization ? `<tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Org</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${order.organization}</td></tr>` : ''}
        ${order.message ? `<tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${order.message}</td></tr>` : ''}
      </table></div>`,
  });
}

export async function sendCustomerConfirmation(order: {
  id: string; firstName: string; email: string; product: { name: string };
}) {
  return sendMail({
    to: order.email,
    subject: "We've Received Your Equipment Request",
    html: `<div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#1a365d">Thank You, ${order.firstName}!</h2>
      <p>We've received your request for <strong>${order.product.name}</strong>.</p>
      <p>Reference: <strong>${order.id}</strong></p>
      <p>Our team will reach out within <strong>24 hours</strong>.</p>
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0">
      <p style="color:#718096;font-size:14px">KTI Health — Premium Healthcare &amp; Technology Solutions</p>
    </div>`,
  });
}

export async function sendContactNotification(contact: {
  id: string; firstName: string; lastName: string; email: string;
  phone: string | null; subject: string; message: string;
}) {
  return sendMail({
    to: VENDOR_EMAIL,
    subject: `New Contact — ${contact.subject}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#1a365d">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${contact.firstName} ${contact.lastName}</td></tr>
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${contact.email}</td></tr>
        ${contact.phone ? `<tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Phone</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${contact.phone}</td></tr>` : ''}
        <tr><td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:bold">Subject</td><td style="padding:8px;border-bottom:1px solid #e2e8f0">${contact.subject}</td></tr>
        <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${contact.message}</td></tr>
      </table></div>`,
  });
}
