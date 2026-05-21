import { Router } from 'express';
import type { Router as IRouter } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth, requireRole } from '../middleware/auth';

const router: IRouter = Router();

const guard = [requireAuth, requireRole('KTI_EMPLOYEE', 'ADMIN')];

// Dashboard stats
router.get('/admin/stats', ...guard, async (_req, res, next) => {
  try {
    const [pendingInquiries, openOrders, newContacts, newApplications] = await Promise.all([
      prisma.inquiryOrder.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: { in: ['PENDING', 'PAID'] } } }),
      prisma.contactSubmission.count({ where: { emailSent: false } }),
      prisma.jobApplication.count({ where: { status: 'PENDING' } }),
    ]);
    res.json({ pendingInquiries, openOrders, newContacts, newApplications });
  } catch (err) {
    next(err);
  }
});

// Inquiry orders (quote requests)
router.get('/admin/inquiries', ...guard, async (req, res, next) => {
  try {
    const { status } = req.query;
    const inquiries = await prisma.inquiryOrder.findMany({
      where: status ? { status: String(status) } : undefined,
      include: { product: { select: { name: true, slug: true, imageUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(inquiries);
  } catch (err) {
    next(err);
  }
});

router.patch('/admin/inquiries/:id', ...guard, async (req, res, next) => {
  try {
    const { status } = req.body as { status: string };
    const inquiry = await prisma.inquiryOrder.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(inquiry);
  } catch (err) {
    next(err);
  }
});

// Purchase orders
router.get('/admin/orders', ...guard, async (req, res, next) => {
  try {
    const { status } = req.query;
    const orders = await prisma.order.findMany({
      where: status ? { status: String(status) } : undefined,
      include: {
        user: { select: { email: true, firstName: true, lastName: true } },
        items: { include: { product: { select: { name: true, slug: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.patch('/admin/orders/:id', ...guard, async (req, res, next) => {
  try {
    const { status } = req.body as { status: string };
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Contact submissions
router.get('/admin/contacts', ...guard, async (_req, res, next) => {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

// Job applications
router.get('/admin/applications', ...guard, async (req, res, next) => {
  try {
    const { status } = req.query;
    const applications = await prisma.jobApplication.findMany({
      where: status ? { status: String(status) } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    res.json(applications);
  } catch (err) {
    next(err);
  }
});

router.patch('/admin/applications/:id', ...guard, async (req, res, next) => {
  try {
    const { status } = req.body as { status: string };
    const application = await prisma.jobApplication.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(application);
  } catch (err) {
    next(err);
  }
});

export default router;
