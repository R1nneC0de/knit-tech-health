export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUser } from '@/lib/api-auth';
import { prisma } from '@/lib/prisma';

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const applySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  position: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const body = applySchema.parse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      position: formData.get('position'),
      message: formData.get('message') ?? undefined,
    });

    const user = getUser(request);

    let resumeData: Buffer | null = null;
    let resumeName: string | null = null;
    let resumeType: string | null = null;

    const file = formData.get('resume');
    if (file instanceof File && file.size > 0) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Resume must be a PDF or Word document' }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'Resume must be under 5 MB' }, { status: 400 });
      }
      resumeData = Buffer.from(await file.arrayBuffer());
      resumeName = file.name;
      resumeType = file.type;
    }

    const { resumeData: _r, ...application } = await prisma.jobApplication.create({
      data: { ...body, userId: user?.id ?? null, resumeData, resumeName, resumeType },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 });
    const msg = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
