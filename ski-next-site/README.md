# Swedish Kitchen Installers

Marketing website for Swedish Kitchen Installers, serving the Kansas City metro and Lawrence area. Built with Next.js 14 and React 18.

## Current features

- Responsive home page and navigation
- Service pages for kitchens, closets, wardrobes, design, inventory, and IKEA systems
- Local pages for Kansas City, Overland Park, Olathe, Lee's Summit, Independence, and Lawrence
- Process, gallery, about, FAQ, contact, and quote pages
- Search metadata, Open Graph metadata, robots.txt, and XML sitemap
- Reusable service, area, process, FAQ, and quote components
- Interactive cabinet installation estimator using a $180-$250 per-cabinet range
- Four-category closet estimator with project size and complexity controls
- Quote form with closet, inventory, and expedited-service questions
- PDF and image drag-and-drop uploads delivered as email attachments

The quote form is intentionally disabled until a business inbox and secure form-delivery service are connected. Gallery images and contact details are launch placeholders.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

- `pnpm install`: install project dependencies
- `pnpm dev`: start the local development site
- `pnpm build`: create and validate the production build
- `pnpm start`: serve the completed production build

## Production checklist

- Purchase Google Workspace for `swedishkitcheninstallers.com`
- Create `quotes@swedishkitcheninstallers.com` and an owner/admin inbox
- Connect a secure quote-form delivery service and test file uploads
- Replace placeholder contact details and gallery images
- Confirm legal business name, phone number, hours, insurance wording, and service claims
- Deploy to a Next.js-compatible host and connect the domain
- Add privacy policy, terms, analytics consent, and spam protection
- Configure Google Analytics, Search Console, Business Profile, and Workspace security

## Quote email setup

Add the following protected environment variables in Vercel for Production, Preview, and Development:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=quotes@ski-kitchens.com
SMTP_APP_PASSWORD=<Google Workspace app password>
QUOTE_TO_EMAIL=quotes@ski-kitchens.com
```

Enable 2-Step Verification for `quotes@ski-kitchens.com`, create a Google Workspace app password, and use that generated password for `SMTP_APP_PASSWORD`. Never commit the password to GitHub.
