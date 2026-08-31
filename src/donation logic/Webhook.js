// api/webhook.js
//
// This endpoint is called by STRIPE'S SERVERS, not by your users' browsers.
// That's exactly why it's reliable: it fires the instant payment succeeds,
// even if the donor closes the tab before the redirect back to your site
// finishes. This is where the confirmation email actually gets sent —
// never send it from the success page itself.
//
// Register this URL in the Stripe Dashboard: Developers → Webhooks →
// Add endpoint → https://yourdomain.com/api/webhook
// Subscribe it to the "checkout.session.completed" event.

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Vercel needs the RAW request body (unparsed) to verify Stripe's
// signature — turn off the default JSON body parser for this route.
export const config = {
  api: {
    bodyParser: false,
  },
};

function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const sig = req.headers["stripe-signature"];
  const rawBody = await buffer(req);

  let event;

  try {
    // This verifies the request genuinely came from Stripe, not
    // someone spoofing a request to your endpoint.
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Everything you attached in metadata when creating the session
    // is right here, untouched by whatever happened in the browser.
    const { donor_name, donor_email, donor_phone, donor_message } =
      session.metadata;

    const amount = (session.amount_total / 100).toFixed(2);

    try {
      await sendDonationEmail({
        name: donor_name,
        email: donor_email,
        phone: donor_phone,
        message: donor_message,
        amount,
        currency: session.currency,
      });
    } catch (err) {
      // Log it, but still return 200 below — otherwise Stripe will
      // keep retrying this webhook, potentially sending duplicate
      // emails once your email issue is fixed. Handle email failures
      // separately (e.g. alerting yourself, a retry queue) rather
      // than by blocking Stripe's webhook acknowledgment.
      console.error("Failed to send donation email:", err);
    }
  }

  // Acknowledge receipt so Stripe doesn't retry.
  return res.status(200).json({ received: true });
}

// ------------------------------------------------------------------
// EMAIL SENDING
// Swap this for whatever provider you use. Resend is shown here
// because it's the least setup for a small org (no SMTP config).
// Alternatives: SendGrid, Postmark, or Nodemailer + your own SMTP.
// ------------------------------------------------------------------
async function sendDonationEmail({ name, email, phone, message, amount, currency }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Hindu PAC <donations@yourdomain.org>",
      to: ["treasurer@yourdomain.org"], // wherever donation notices should land
      reply_to: email,
      subject: `New donation received — $${amount} ${currency.toUpperCase()}`,
      html: `
        <h2>New Donation Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Amount:</strong> $${amount} ${currency.toUpperCase()}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
      `,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend API error: ${text}`);
  }
}