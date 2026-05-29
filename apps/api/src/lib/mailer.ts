import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM_EMAIL = process.env.RESEND_FROM || 'KTI Health <noreply@knittechhealth.com>';

console.log('[Email] Mailer init — RESEND_API_KEY set:', !!process.env.RESEND_API_KEY, '| FROM:', FROM_EMAIL);

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  console.log('[Email] sendMail called — to:', options.to, '| subject:', options.subject);

  if (!resend) {
    console.log('[Email] RESEND_API_KEY not configured — skipping');
    return null;
  }

  console.log('[Email] Calling Resend API...');
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  if (error) {
    console.error('[Email] Resend returned error:', JSON.stringify(error));
    throw new Error(`[Email] Resend error: ${JSON.stringify(error)}`);
  }

  console.log('[Email] Sent successfully — id:', data?.id);
  return data;
}
