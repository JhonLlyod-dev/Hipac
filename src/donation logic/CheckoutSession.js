// api/create-checkout-session.js
//
// Vercel serverless function. Deploy this in an `api/` folder at your
// project root (sibling to `src/`) — Vercel auto-detects it as an endpoint
// at POST /api/create-checkout-session. Netlify Functions work almost
// identically; see the note at the bottom of this file if that's your host.
//
// This is the ONLY place your Stripe secret key should ever be used.
// Never put it in a .env file that starts with VITE_ — anything prefixed
// VITE_ gets bundled into the browser and becomes public.

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, amount, phone, message } = req.body;

    // Basic server-side validation. Never trust the client alone.
    if (!name || !email || !amount) {
      return res
        .status(400)
        .json({ error: "Name, email, and amount are required." });
    }

    const amountInCents = Math.round(Number(amount) * 100);

    if (!Number.isFinite(amountInCents) || amountInCents < 100) {
      return res.status(400).json({ error: "Invalid donation amount." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation to Hindu PAC",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],

      // ⭐ This is the key piece that solves your "data gets lost on
      // redirect" problem. Whatever you put here is stored by Stripe
      // against this session and is available later — both in the
      // webhook event AND if you fetch the session by ID on your
      // success page. The browser doesn't need to remember anything.
      metadata: {
        donor_name: name,
        donor_email: email,
        donor_phone: phone || "",
        donor_message: message || "",
      },

      customer_email: email,

      success_url: `${process.env.SITE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/donate`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
}

// ------------------------------------------------------------------
// NETLIFY VERSION (if you deploy there instead of Vercel):
// Put this in `netlify/functions/create-checkout-session.js` and use:
//
//   export const handler = async (event) => {
//     const { name, email, amount, phone, message } = JSON.parse(event.body);
//     // ...same logic as above...
//     return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
//   };
// ------------------------------------------------------------------