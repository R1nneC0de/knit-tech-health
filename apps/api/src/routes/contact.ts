import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { prisma } from '../lib/prisma';
import { sendContactNotification } from '../services/email.service';

const router = Router();

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactInput = z.infer<typeof contactSchema>;

router.post(
  '/contact',
  validate(contactSchema),
  async (req: Request, res: Response) => {
    const submission = await prisma.contactSubmission.create({
      data: req.body,
    });

    sendContactNotification(submission)
      .then(async () => {
        await prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { emailSent: true },
        });
      })
      .catch((err) => {
        console.error('[Email] Failed to send contact notification:', err);
      });

    res.status(201).json(submission);
  },
);

export default router;
