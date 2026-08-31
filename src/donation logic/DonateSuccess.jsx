// src/pages/DonateSuccess.jsx
//
// This page is UX only — a "thank you" confirmation for the person who
// just paid. It is NOT responsible for sending the email; the webhook
// (api/webhook.js) already did that server-to-server the moment payment
// completed, regardless of whether the user ever lands here.
//
// Route this at /donate/success (matches success_url in
// create-checkout-session.js). Requires react-router's useSearchParams,
// swap for your router's equivalent if different.

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function DonateSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Optional: verify the session actually completed rather than just
    // trusting the URL. Requires a small GET endpoint
    // (api/session-status.js) that calls
    // stripe.checkout.sessions.retrieve(sessionId) server-side.
    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status === "complete" ? "success" : "error");
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-hipac-warm-white px-5 py-20">
      <div className="max-w-md text-center">
        {status === "loading" && (
          <p className="font-body text-hipac-muted">Confirming your donation…</p>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={48} className="mx-auto text-hipac-orange" />
            <h1 className="mt-5 font-heading text-3xl font-extrabold text-hipac-brown">
              Thank you for your donation.
            </h1>
            <p className="mt-3 font-body leading-7 text-hipac-muted">
              Your support helps Hindu PAC advocate for the Hindu-American
              community. A confirmation has been sent to our team.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="font-heading text-2xl font-bold text-hipac-brown">
              We couldn't confirm this donation.
            </h1>
            <p className="mt-3 font-body text-sm text-hipac-muted">
              If you completed a payment, don't worry — it was still
              processed on Stripe's side. Contact us if you'd like a
              receipt.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
