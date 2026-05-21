# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# KTI Health — KnitTechInc Multi-Division Website

Medical equipment e-commerce + healthcare staffing + IT solutions, under the KnitTechInc brand.

## Stack

- **Monorepo:** pnpm workspaces (`apps/api`, `apps/web`, `packages/shared`)
- **Frontend:** Next.js 14 App Router + Tailwind CSS + React Query
- **Backend:** Express.js + Prisma ORM + PostgreSQL
- **Auth:** JWT (access + refresh tokens), bcryptjs
- **Payments:** Stripe + PayPal (both wired, webhooks at `/api/webhooks`)
- **Email:** Nodemailer (SMTP)
- **Validation:** Zod (shared schemas)

## Color Scheme

- **Blue:** `brand-blue-*` tokens (headings, navbar, footer, primary buttons) — primary: `#003D6F`
- **Accent:** `brand-yellow-*` tokens (CTAs, highlights, icons) — touch of KTI logo yellow
- **White:** backgrounds, cards, surfaces

All color tokens in `apps/web/tailwind.config.ts`. Never hardcode hex in components.

## User Roles

Three roles exist in the system:

| Role | Description |
|------|-------------|
| `CUSTOMER` | Default public user — can browse, request quotes, apply to jobs |
| `KTI_EMPLOYEE` | Internal KTI staff — full dashboard: orders, quotes, contact submissions, job apps |
| `ADMIN` | Reserved for super-admin capabilities (same as KTI_EMPLOYEE for now) |

Role-based redirect after login: `CUSTOMER` → `/dashboard/client`, `KTI_EMPLOYEE`/`ADMIN` → `/dashboard/employee`.
Employee/admin routes protected by `requireRole('KTI_EMPLOYEE', 'ADMIN')` middleware on the API.
Frontend uses `<RoleProtectedRoute allowedRoles={[...]}>` wrapper.

## Site Divisions

| Route | Description |
|-------|-------------|
| `/` | Multi-division landing page (KnitTechInc homepage) |
| `/shop-medical` | Medical equipment — quote-only (no prices shown publicly) |
| `/staffing` | Healthcare staffing division |
| `/it-solutions` | IT solutions division |
| `/about`, `/contact` | Company-wide pages |
| `/dashboard/client` | Client dashboard (orders, quotes, job applications, staffing requests) |
| `/dashboard/employee` | KTI employee dashboard (all orders, quotes, applications, contacts) |

## Project Structure

```
knit-tech-health/
├── apps/
│   ├── api/          # Express API server (port 3001)
│   │   ├── prisma/   # Schema + seed script
│   │   └── src/
│   │       ├── lib/        # prisma, mailer, stripe, paypal clients
│   │       ├── routes/     # auth, products, orders, cart, checkout, contact, webhooks, admin
│   │       ├── services/   # auth, cart, checkout, email, order, product services
│   │       └── middleware/ # auth (JWT + role check), errorHandler, validate
│   └── web/          # Next.js frontend (port 3000)
│       └── src/
│           ├── app/         # Pages (see Route Map below)
│           ├── components/  # layout/, home/, shop/, product/, checkout/, auth/, dashboard/, forms/, ui/
│           ├── contexts/    # AuthContext, CartContext
│           ├── hooks/       # React Query hooks
│           └── lib/         # API fetch wrapper
├── packages/
│   └── shared/       # @kth/shared — types, constants (VENDOR_COMPANY, VENDOR_EMAIL)
├── docker-compose.yml  # PostgreSQL 15
└── pnpm-workspace.yaml
```

## API Routes

**Auth** (`/api/auth`)
- `POST /login` — email+password → `{ user, accessToken, refreshToken }`
- `POST /register` — create account
- `POST /refresh` — rotate tokens
- `GET /me` — current user (requires auth)

**Products / Categories**
- `GET /api/products?category=slug&search=term`
- `GET /api/products/:slug`
- `GET /api/categories`

**Cart** (requires auth)
- `GET /api/cart`, `POST /api/cart`, `PATCH /api/cart/:itemId`, `DELETE /api/cart/:itemId`

**Checkout** (requires auth)
- `POST /api/checkout/create-payment-intent` — Stripe
- `POST /api/checkout/create-paypal-order` — PayPal
- `POST /api/checkout/confirm` — finalize order

**Inquiry / Contact**
- `POST /api/orders` — equipment inquiry (no login required)
- `POST /api/contact` — contact form

**Employee Dashboard** (`/api/admin`, requires `KTI_EMPLOYEE` or `ADMIN` role)
- `GET /api/admin/inquiries` — all InquiryOrders
- `GET /api/admin/orders` — all Orders
- `GET /api/admin/contacts` — all ContactSubmissions
- `GET /api/admin/job-applications` — all JobApplications
- `PATCH /api/admin/inquiries/:id` — update inquiry status
- `PATCH /api/admin/orders/:id` — update order status

## Database

- PostgreSQL via Docker (`kth:kth@localhost:5433/kth`) — port 5433
- Models: `Category`, `Product`, `User`, `Cart`, `CartItem`, `Order`, `OrderItem`, `InquiryOrder`, `ContactSubmission`, `JobApplication`
- `Order` = completed purchase (Stripe/PayPal); `InquiryOrder` = equipment quote request
- Seed script: 8 categories, ~92 products

## Commands

```bash
pnpm install              # Install all dependencies
docker compose up -d      # Start PostgreSQL
pnpm db:migrate           # Run Prisma migrations
pnpm db:seed              # Seed categories + products
pnpm dev:api              # Start API on :3001
pnpm dev:web              # Start frontend on :3000
pnpm db:studio            # Open Prisma Studio
pnpm build                # Build all packages
pnpm lint                 # Lint all packages
```

## Key Patterns

### Purchase / Inquiry Flow
Equipment is quote-only — no public prices displayed. Two paths:
1. **Inquiry (no login):** "Request a Quote" → inquiry form → `InquiryOrder` record + vendor email
2. **E-commerce (logged-in):** Cart → checkout → Stripe/PayPal → `Order` record (internal/backend use)

### Role-Based Access
- `requireAuth()` middleware — validates JWT, adds `req.user` (`{ id, email, role }`)
- `requireRole(...roles)` middleware — checks `req.user.role` against allowed roles, returns 403 if not allowed
- Frontend `RoleProtectedRoute` — redirects based on role; wraps employee dashboard pages

### Auth
JWT access token in memory + httpOnly refresh token cookie. `AuthContext` exposes `user`, `login`, `logout`. Login redirects to role-appropriate dashboard. `CartContext` syncs with API on auth state change.

### Shared Constants
`VENDOR_COMPANY` and `VENDOR_EMAIL` in `packages/shared/src/index.ts` — use in email templates and UI copy.

## Conventions

- Use `@kth/shared` for types shared between frontend and backend
- All form submissions validated with Zod on the API side
- Fonts: Inter (body `font-sans`), Poppins (headings `font-heading`) via `next/font/google`
- Icons: lucide-react only
- Logo: `apps/web/public/logo.jpeg` — use `<Image>` from next/image in components
- Color tokens only — never hardcode hex values in components
- `UserRole` type in `@kth/shared`: `'CUSTOMER' | 'KTI_EMPLOYEE' | 'ADMIN'`
