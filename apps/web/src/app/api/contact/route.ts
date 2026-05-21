export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendContactNotification } from '@/lib/mailer';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = contactSchema.parse(await request.json());
    const submission = await prisma.contactSubmission.create({ data: body });

    sendContactNotification(submission)
      .then(async () => {
        await prisma.contactSubmission.update({ where: { id: submission.id }, data: { emailSent: true } });
      })
      .catch((err) => console.error('[Email] Failed to send contact notification:', err));

    return NextResponse.json(submission, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
