import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM || 'KTI Health <noreply@knittechhealth.com>';

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log('[Email] RESEND_API_KEY not configured — skipping email:', options.subject);
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    throw new Error(`[Email] Resend error: ${JSON.stringify(error)}`);
  }

  return data;
}
