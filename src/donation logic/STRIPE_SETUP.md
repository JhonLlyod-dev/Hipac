# Stripe Donation Integration — Setup Guide

## What this solves
Your original concern: redirecting to Stripe and back loses your form data.
**Fix:** the form data never has to survive the redirect. It's attached to
the Stripe Checkout Session as `metadata` when the session is *created*
(server-side), and read back out by a **webhook** — a server-to-server
call from Stripe — the instant payment succeeds. This works even if the
donor closes their browser tab right after paying.

## Files in this delivery
- `api/create-checkout-session.js` — creates the Stripe session, attaches donor info as metadata
- `api/webhook.js` — Stripe calls this when payment completes; sends the confirmation email
- `DonationForm.jsx` — updated form, posts to your backend instead of Stripe directly
- `DonateSuccess.jsx` — thank-you page shown after redirect (confirmation only, doesn't send email)

## Setup steps

### 1. Pick a host with serverless functions
Since you're on Vite with no backend, deploy to **Vercel** (recommended —
zero config for this) or **Netlify**. Both let `api/*.js` files become
live endpoints automatically alongside your static Vite build.

```
npm install stripe
```

### 2. Get your Stripe keys
In the [Stripe Dashboard](https://dashboard.stripe.com/apikeys):
- Copy your **Secret key** (starts `sk_`) — never expose this to the browser
- You'll get a **Webhook signing secret** in step 5 below

### 3. Set environment variables (on your host, e.g. Vercel dashboard)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...       (from step 5)
SITE_URL=https://yourdomain.org
RESEND_API_KEY=re_...                 (or swap for SendGrid/etc.)
```
Never prefix these with `VITE_` — that would bundle them into the public
frontend code.

### 4. Drop in the files
- `api/create-checkout-session.js` → project root, in an `api/` folder
- `api/webhook.js` → same folder
- Replace your existing `DonationForm.jsx`
- Add `DonateSuccess.jsx` as a new route at `/donate/success`

### 5. Register the webhook
1. Deploy your site first (so the webhook URL exists).
2. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
3. URL: `https://yourdomain.org/api/webhook`
4. Select event: `checkout.session.completed`
5. Copy the **Signing secret** shown → set as `STRIPE_WEBHOOK_SECRET`

### 6. Test it
Use Stripe's test mode + test card `4242 4242 4242 4242` (any future date,
any CVC) to run through the full flow before going live. Stripe also has
a CLI (`stripe listen --forward-to localhost:3000/api/webhook`) for
testing webhooks on your local machine.

### 7. Go live
Swap test keys for live keys (`sk_live_...`), re-register the webhook
against your live endpoint (test and live mode have separate webhooks),
and you're done.

## Why not just use Stripe Elements (embedded) instead?
It's a valid option — the donor never leaves your page at all, so there's
no redirect to worry about in the first place. But it's noticeably more
setup: you'd add `@stripe/react-stripe-js`, wrap your app in an `Elements`
provider, and manually confirm the Payment Intent client-side. Checkout
(what's built here) gets you live faster with less surface area for bugs.
If you outgrow it later, the backend logic (session creation, webhook,
metadata) carries over almost unchanged — you'd mainly be swapping the
frontend piece.
