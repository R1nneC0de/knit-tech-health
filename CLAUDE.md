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

- **Light Pink:** `brand-pink-*` tokens (CTAs, highlights, icons)
- **Dark/Denim Blue:** `brand-blue-*` tokens (headings, navbar, footer, primary buttons)
- **White:** backgrounds, cards, surfaces

All color tokens in `apps/web/tailwind.config.ts`. Never hardcode hex in components.

## Site Divisions

| Route | Description |
|-------|-------------|
| `/` | Multi-division landing page (KnitTechInc homepage) |
| `/shop-medical` | Medical equipment B2B store |
| `/staffing` | Healthcare staffing division |
| `/it-solutions` | IT solutions division |
| `/about`, `/contact` | Company-wide pages |

## Project Structure

```
knit-tech-health/
├── apps/
│   ├── api/          # Express API server (port 3001)
│   │   ├── prisma/   # Schema + seed script
│   │   └── src/
│   │       ├── lib/        # prisma, mailer, stripe, paypal clients
│   │       ├── routes/     # auth, products, orders, cart, checkout, contact, webhooks
│   │       ├── services/   # auth, cart, checkout, email, order, product services
│   │       └── middleware/ # auth (JWT), errorHandler, validate
│   └── web/          # Next.js frontend (port 3000)
│       └── src/
│           ├── app/         # Pages: /, /shop-medical, /staffing, /it-solutions, /about, /contact, /cart, /checkout, /login, /register, /orders
│           ├── components/  # layout/, home/, shop/, product/, checkout/, auth/, forms/, ui/
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

**Products / Categories**
- `GET /api/products?category=slug&search=term`
- `GET /api/products/:slug`
- `GET /api/categories`

**Cart** (requires auth)
- `GET /api/cart` — get cart with items
- `POST /api/cart` — add item `{ productId, quantity }`
- `PATCH /api/cart/:itemId` — update quantity
- `DELETE /api/cart/:itemId` — remove item

**Checkout** (requires auth)
- `POST /api/checkout` — create order, initiate payment
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `POST /api/webhooks/paypal` — PayPal webhook handler

**Inquiry / Contact**
- `POST /api/orders` — create equipment inquiry (no login required)
- `POST /api/contact` — contact form submission

## Database

- PostgreSQL via Docker (`kth:kth@localhost:5433/kth`) — port 5433 to avoid conflict with local PG
- Models: `Category`, `Product`, `User`, `Cart`, `CartItem`, `Order`, `OrderItem`, `InquiryOrder`, `ContactSubmission`
- `Order` = completed purchase (Stripe/PayPal); `InquiryOrder` = quote request (no payment)
- Seed script: 8 categories, ~92 products with prices

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

### Purchase Flow
Two paths exist side by side:
1. **E-commerce (logged-in):** Add to cart → checkout → Stripe/PayPal payment → `Order` record
2. **Inquiry (no login):** "Request This Equipment" → inquiry form → `InquiryOrder` record + email to vendor

### Auth
JWT stored in memory (access token) + httpOnly cookie (refresh token). `AuthContext` at `apps/web/src/contexts/AuthContext.tsx` exposes `user`, `login`, `logout`. `CartContext` syncs with API on auth state.

### Shared Constants
`VENDOR_COMPANY` and `VENDOR_EMAIL` in `packages/shared/src/index.ts` — use these in email templates and UI copy.

## Conventions

- Use `@kth/shared` for types shared between frontend and backend
- All form submissions validated with Zod on the API side
- Fonts: Inter (body `font-sans`), Poppins (headings `font-heading`) via `next/font/google`
- Icons: lucide-react only
- Logo: `apps/web/public/logo.jpeg` — use `<Image>` from next/image in components
