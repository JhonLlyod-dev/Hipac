// src/components/DonationForm.jsx
//
// Note: this component never talks to Stripe directly. It only ever
// calls YOUR backend endpoint. Your backend holds the secret key and
// talks to Stripe on the form's behalf.

import { useState } from "react";

const presetAmounts = [25, 50, 100, 250];

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function selectPreset(amount) {
    setFormData((prev) => ({ ...prev, amount: String(amount) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Send the browser to Stripe's hosted checkout page.
      // The form data doesn't need to travel with it — it's already
      // safely attached to the session on Stripe's side (see the
      // metadata field in create-checkout-session.js).
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-heading text-sm font-bold text-hipac-brown">
          Donation amount
        </label>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => selectPreset(amount)}
              className={`rounded-xl border px-4 py-3 font-heading text-sm font-bold transition-colors ${
                formData.amount === String(amount)
                  ? "border-hipac-orange bg-hipac-orange text-white"
                  : "border-hipac-border text-hipac-brown hover:border-hipac-orange"
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>

        <input
          type="number"
          name="amount"
          min="1"
          step="1"
          placeholder="Or enter a custom amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="mt-3 w-full rounded-xl border border-hipac-border px-4 py-3 font-body text-sm text-hipac-brown focus:border-hipac-orange focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-heading text-sm font-bold text-hipac-brown">
            Full name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-hipac-border px-4 py-3 font-body text-sm text-hipac-brown focus:border-hipac-orange focus:outline-none"
          />
        </div>

        <div>
          <label className="font-heading text-sm font-bold text-hipac-brown">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-hipac-border px-4 py-3 font-body text-sm text-hipac-brown focus:border-hipac-orange focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="font-heading text-sm font-bold text-hipac-brown">
          Phone (optional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-hipac-border px-4 py-3 font-body text-sm text-hipac-brown focus:border-hipac-orange focus:outline-none"
        />
      </div>

      <div>
        <label className="font-heading text-sm font-bold text-hipac-brown">
          Message (optional)
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-hipac-border px-4 py-3 font-body text-sm text-hipac-brown focus:border-hipac-orange focus:outline-none"
        />
      </div>

      {error && (
        <p className="font-body text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-button bg-hipac-orange px-7 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-hipac-brown disabled:opacity-60"
      >
        {submitting ? "Redirecting to secure checkout…" : "Donate Now"}
      </button>

      <p className="font-body text-xs leading-5 text-hipac-muted">
        You'll be redirected to Stripe's secure checkout page to complete
        your donation.
      </p>
    </form>
  );
}
