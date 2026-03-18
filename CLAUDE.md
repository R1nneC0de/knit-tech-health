# Knit Tech Health

Medical equipment vendor website — browse equipment, request quotes, get notified.

## Stack

- **Monorepo:** pnpm workspaces (`apps/api`, `apps/web`, `packages/shared`)
- **Frontend:** Next.js 14 App Router + Tailwind CSS + React Query
- **Backend:** Express.js + Prisma ORM + PostgreSQL
- **Email:** Nodemailer (SMTP)
- **Validation:** Zod (shared schemas)

## Color Scheme

- **Light Pink:** `brand-pink-*` tokens (hero accents, CTAs, highlights)
- **Dark/Denim Blue:** `brand-blue-*` tokens (headings, navbar, footer, primary buttons)
- **White:** backgrounds, cards, surfaces

All color tokens defined in `apps/web/tailwind.config.ts`. Never hardcode hex in components.

## Project Structure

```
knit-tech-health/
├── apps/
│   ├── api/          # Express API server (port 3001)
│   │   ├── prisma/   # Schema + seed script
│   │   └── src/
│   │       ├── lib/        # prisma client, mailer, logger
│   │       ├── routes/     # products, orders, contact
│   │       ├── services/   # business logic + email
│   │       └── middleware/  # error handling, validation
│   └── web/          # Next.js frontend (port 3000)
│       └── src/
│           ├── app/         # Pages (home, shop, about, contact, request)
│           ├── components/  # layout/, home/, shop/, product/, forms/, ui/
│           ├── hooks/       # React Query hooks
│           └── lib/         # API fetch wrapper
├── packages/
│   └── shared/       # @kth/shared — types, constants
├── docker-compose.yml  # PostgreSQL 15
└── pnpm-workspace.yaml
```

## Key Patterns

### Purchase Flow (Cardinal Health style)
No shopping cart. Users browse products → click "Request This Equipment" → fill out inquiry form → order saved to DB + email sent to vendor (`info@knittechhealth.com`) + confirmation email to customer.

### API Routes
- `GET /api/products?category=slug&search=term` — list with filters
- `GET /api/products/:slug` — single product with category
- `GET /api/categories` — all categories
- `POST /api/orders` — create equipment request (Zod validated)
- `POST /api/contact` — contact form submission

### Database
- PostgreSQL via Docker (`kth:kth@localhost:5433/kth`) — port 5433 to avoid conflict with local PG
- 4 models: Category, Product, InquiryOrder, ContactSubmission
- Seed script: 8 categories, ~28 products

## Commands

```bash
pnpm install              # Install all dependencies
docker compose up -d      # Start PostgreSQL
pnpm db:migrate           # Run Prisma migrations
pnpm db:seed              # Seed categories + products
pnpm dev:api              # Start API on :3001
pnpm dev:web              # Start frontend on :3000
pnpm db:studio            # Open Prisma Studio
```

## Conventions

- Use `@kth/shared` for types shared between frontend and backend
- All form submissions validated with Zod on the API side
- Product images use placeholder paths (`/images/products/{slug}.jpg`)
- Fonts: Inter (body), Poppins (headings) via `next/font/google`
- Icons: lucide-react
