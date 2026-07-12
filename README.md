# Jack Landis — Portfolio

Personal portfolio for Jack Landis, focused on product strategy, operations, and the systems behind high-quality execution.

## Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Vercel Analytics

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```

## Deployment

The site is configured for deployment on Vercel. Import the repository, keep the standard Next.js build settings, and deploy.

To deliver messages from the homepage contact form, add these environment variables in Vercel:

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=you@example.com
# Optional after verifying a sending domain in Resend:
CONTACT_FROM_EMAIL="Jack Landis <hello@yourdomain.com>"
```

Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` for Production, Preview, and
Development. Redeploy after adding them; Vercel environment variable changes do
not update an existing deployment. Without these variables, the form offers
visitors a direct email fallback.
