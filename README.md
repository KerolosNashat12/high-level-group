# High Level Group — Website + Admin Dashboard

Full rebuild of the High Level Group finishing/interior-design website (Next.js 14, TypeScript,
Tailwind), plus an admin dashboard to manage package prices and the new **"طلب معاينة"**
(site visit request) leads, with email notifications on new submissions.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Drizzle ORM** + **PostgreSQL** (works with any Postgres host: Neon, Vercel Postgres, Supabase, Railway...)
- **NextAuth** (credentials login) for the admin dashboard
- **Resend** for email notifications on new visit requests (optional — app works fine without it)
- **Zod** for input validation

## Project structure

```
src/
  app/
    (site)/            # public website: home, packages, about, contact
    admin/              # admin dashboard (protected by middleware)
    api/                # visit-requests, contact, packages, auth routes
  components/           # Header, Footer, forms, admin UI
  db/                   # Drizzle schema, client, seed script
  lib/                  # auth config, data access, email helper
```

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** — copy `.env.example` to `.env` and fill in:
   ```
   DATABASE_URL=              # Postgres connection string
   NEXTAUTH_SECRET=           # random 32+ char string (openssl rand -base64 32)
   NEXTAUTH_URL=              # http://localhost:3000 locally, your domain in production
   RESEND_API_KEY=            # optional — leave blank to skip email notifications
   NOTIFY_EMAIL=              # where to send new visit-request alerts
   ADMIN_SEED_EMAIL=          # first admin login email (used only by the seed script)
   ADMIN_SEED_PASSWORD=       # first admin login password (used only by the seed script)
   ```

3. **Push the database schema and seed initial data** (3 packages + admin user):
   ```bash
   npx drizzle-kit push
   npx tsx src/db/seed.ts
   ```
   This prints the admin login it created — **change that password** after first login
   (there's no in-app "change password" screen yet; update it directly via `ADMIN_SEED_PASSWORD`
   + re-run the seed, or update the DB row).

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Site: http://localhost:3000
   Admin dashboard: http://localhost:3000/admin/login

## What's included

- **Public site**: home, packages/pricing (3 tiers — Economy/Super/Ultra Luxury, editable),
  about, contact — Arabic RTL, gold branding matching the original site's theme color (#b48b4e).
- **"طلب معاينة" (request a site visit)**: a form on the homepage and packages page that saves
  a lead (name, phone, city, area, property type, package, preferred date, notes) to the
  database and — if `RESEND_API_KEY` + `NOTIFY_EMAIL` are set — emails you immediately.
- **Admin dashboard** (`/admin`, login required):
  - **Overview**: lead counts, message counts, recent activity.
  - **Packages**: edit price-per-meter, down-payment %, installment months, and "featured"
    flag for each package — changes reflect on the public site immediately.
  - **Leads**: table of all visit requests with phone (click-to-call), package, preferred
    date, and a status dropdown (new → contacted → scheduled → done/cancelled).

## Deploying to GitHub + Vercel

1. **Create the GitHub repo** (from this folder):
   ```bash
   git remote add origin git@github.com:<your-username>/high-level-group.git
   git branch -M main
   git push -u origin main
   ```
   (Or create the repo first on github.com, then run the two commands above with its URL.)

2. **Set up a production Postgres database** — easiest options that plug straight into Vercel:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (native integration)
   - [Neon](https://neon.tech) (generous free tier, serverless Postgres)
   Copy the connection string it gives you for the next step.

3. **Deploy on Vercel**:
   - Go to vercel.com → New Project → import the GitHub repo.
   - Add environment variables (same keys as `.env.example`) in Project Settings → Environment
     Variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (your Vercel domain),
     `RESEND_API_KEY`, `NOTIFY_EMAIL`.
   - Deploy.

4. **After first deploy**, push the schema and seed the production database once (from your
   machine, pointing at the production `DATABASE_URL`):
   ```bash
   DATABASE_URL="<production-url>" npx drizzle-kit push
   DATABASE_URL="<production-url>" ADMIN_SEED_EMAIL="..." ADMIN_SEED_PASSWORD="..." npx tsx src/db/seed.ts
   ```

5. **Email notifications**: sign up at [resend.com](https://resend.com) (free tier available),
   get an API key, add it as `RESEND_API_KEY` in Vercel. Without it, visit requests still save
   to the dashboard — you just won't get an email ping.

## Notes

- Package prices, features, and content are starting placeholders based on typical finishing-
  company packages — update names/prices/features to match your actual offering from
  `/admin/packages`, or edit `src/db/seed.ts` and re-seed.
- The homepage hero image is a stock photo placeholder — swap it for your own project photos
  in `src/app/(site)/page.tsx`.
- Contact phone/email/social links in the footer and contact page are placeholders — update
  them in `src/components/Footer.tsx` and `src/app/(site)/contact/page.tsx`.
