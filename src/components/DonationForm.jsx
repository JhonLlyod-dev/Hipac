import { useState } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Info,
  Lock,
} from "lucide-react";

const initialForm = {
  occupation: "",
  employer: "",
  name: "",
  email: "",
  phone: "",

  billing: {
    fullName: "",
    country: "United States",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  },

  amount: "",
  monthly: false,
  consent: false,
};

const amounts = ["2000", "3300"];

export default function DonationForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleBillingChange(e) {
  const { name, value } = e.target;

  const field = name.replace("billing.", "");

  setForm((prev) => ({
    ...prev,
    billing: {
      ...prev.billing,
      [field]: value,
    },
  }));
}

  function handleAmountChange(amount) {
    setForm((prev) => ({
      ...prev,
      amount,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.consent) {
      alert("Please confirm the contribution requirements.");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a contribution amount.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Later:
       *
       * POST /api/create-checkout-session
       *
       * The backend will:
       * 1. Validate the donor information
       * 2. Create the Stripe Checkout Session
       * 3. Pass the donor information as metadata/custom fields
       * 4. Return the Stripe Checkout URL
       */

      const response = await fetch(
        "/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to start donation."
        );
      }

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* =====================================================
          CONTRIBUTOR INFORMATION
      ===================================================== */}

      <section>
        <div className="mb-5">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-hipac-orange">
            Contributor Information
          </p>

          <h2 className="mt-2 font-heading text-2xl font-extrabold text-hipac-brown">
            Tell us about yourself
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Occupation */}
          <Input
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            required
          />

          {/* Employer */}
          <Input
            label="Employer"
            name="employer"
            value={form.employer}
            onChange={handleChange}
            required
          />

          {/* Name */}
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            optional
          />

          {/* Email */}
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            optional
          />
        </div>
      </section>

      {/* =====================================================
          BILLING ADDRESS
      ===================================================== */}
      <section>
        <div className="mb-5">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-hipac-orange">
            Billing Address
          </p>

          <h2 className="mt-2 font-heading text-2xl font-extrabold text-hipac-brown">
            Billing Information
          </h2>
        </div>

        <div className="space-y-5">
          {/* Full Name */}
          <Input
            label="Full Name"
            name="billing.fullName"
            value={form.billing.fullName}
            onChange={handleBillingChange}
            required
          />

          {/* Country */}
          <div>
            <label className="mb-2 block font-heading text-sm font-bold text-hipac-brown">
              Country or Region
            </label>

            <select
              name="country"
              value={form.billing.country}
              onChange={handleBillingChange}
              className="w-full rounded-lg border border-hipac-border bg-white px-4 py-3 font-body text-sm outline-none transition focus:border-hipac-orange focus:ring-2 focus:ring-hipac-orange/10"
            >
              <option value="United States">
                United States
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Address Line 1 */}
          <Input
            label="Address Line 1"
            name="billing.addressLine1"
            value={form.billing.addressLine1}
            onChange={handleBillingChange}
            required
          />

          {/* Address Line 2 */}
          <Input
            label="Address Line 2"
            name="billing.addressLine2"
            value={form.billing.addressLine2}
            onChange={handleBillingChange}
            optional
            placeholder="Apt., suite, unit number, etc."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {/* City */}
            <Input
              label="City"
              name="billing.city"
              value={form.billing.city}
              onChange={handleBillingChange}
              required
            />

            {/* State */}
            <Input
              label="State"
              name="billing.state"
              value={form.billing.state}
              onChange={handleBillingChange}
              required
            />
          </div>

          {/* ZIP */}
          <Input
            label="ZIP Code"
            name="billing.zipCode"
            value={form.billing.zipCode}
            onChange={handleBillingChange}
            required
          />
        </div>
      </section>

      {/* =====================================================
          AMOUNT
      ===================================================== */}

      <section>
        <div className="mb-5">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-hipac-orange">
            Contribution
          </p>

          <h2 className="mt-2 font-heading text-2xl font-extrabold text-hipac-brown">
            Choose your contribution
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {amounts.map((amount) => {
            const selected = form.amount === amount;

            return (
              <button
                type="button"
                key={amount}
                onClick={() => handleAmountChange(amount)}
                className={`rounded-xl border px-5 py-4 text-left transition ${
                  selected
                    ? "border-hipac-orange bg-hipac-orange/5 ring-2 ring-hipac-orange/10"
                    : "border-hipac-border bg-white hover:border-hipac-orange"
                }`}
              >
                <span className="block font-heading text-xl font-extrabold text-hipac-brown">
                  ${Number(amount).toLocaleString()}
                </span>

                <span className="mt-1 block font-body text-xs text-hipac-muted">
                  One-time contribution
                </span>
              </button>
            );
          })}

          {/* Custom */}
          <div
            className={`rounded-xl border px-5 py-4 transition sm:col-span-3 ${
              form.amount &&
              !amounts.includes(form.amount)
                ? "border-hipac-orange bg-hipac-orange/5"
                : "border-hipac-border"
            }`}
          >
            <label className="font-heading text-sm font-bold text-hipac-brown">
              Custom Amount
            </label>

            <div className="mt-3 flex items-center rounded-lg border border-hipac-border bg-white">
              <span className="px-4 font-heading font-bold text-hipac-muted">
                $
              </span>

              <input
                type="number"
                min="1"
                step="0.01"
                value={
                  amounts.includes(form.amount)
                    ? ""
                    : form.amount
                }
                onChange={(e) =>
                  handleAmountChange(e.target.value)
                }
                placeholder="Enter amount"
                className="w-full rounded-r-lg border-0 px-3 py-3 font-body text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {/* Monthly */}
        <label className="mt-5 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            name="monthly"
            checked={form.monthly}
            onChange={handleChange}
            className="h-4 w-4 accent-hipac-orange"
          />

          <span className="font-body text-sm text-hipac-muted">
            Make this a monthly contribution
          </span>
        </label>
      </section>

      {/* =====================================================
          LEGAL NOTICE
      ===================================================== */}

      <div className="rounded-xl border border-hipac-orange/20 bg-hipac-orange/5 p-5">
        <div className="flex gap-3">
          <Info
            size={20}
            className="mt-0.5 shrink-0 text-hipac-orange"
          />

          <div>
            <h3 className="font-heading text-sm font-bold text-hipac-brown">
              Contribution Requirements
            </h3>

            <p className="mt-2 font-body text-xs leading-5 text-hipac-muted">
              Contributions to HiPAC are not tax deductible as
              charitable contributions for Federal income tax
              purposes. HiPAC funds will be used for political
              purposes. Corporate contributions are not accepted.
              You must be either a US citizen or a lawful permanent
              resident to contribute to HiPAC, and must be at least
              eighteen years of age. Individuals may contribute up
              to $5,000 to HiPAC in a calendar year.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONSENT
      ===================================================== */}

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-hipac-orange"
        />

        <span className="font-body text-xs leading-5 text-hipac-muted">
          I confirm that I am eligible to make this contribution
          and that the information I have provided is accurate.
        </span>
      </label>

      {/* =====================================================
          SUBMIT
      ===================================================== */}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-hipac-orange px-6 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition hover:bg-hipac-brown disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard size={18} />

        {loading
          ? "Redirecting to Stripe..."
          : "Continue to Secure Payment"}

        {!loading && <ArrowRight size={18} />}
      </button>

      <div className="flex items-center justify-center gap-2 text-center font-body text-xs text-hipac-muted">
        <Lock size={14} />

        Secure payment processing through Stripe
      </div>
    </form>
  );
}

/* ============================================================
   REUSABLE INPUT
============================================================ */

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  optional = false,
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block font-heading text-sm font-bold text-hipac-brown">
        {label}

        {optional && (
          <span className="ml-1 font-body text-xs font-normal text-hipac-muted">
            (optional)
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-hipac-border bg-white px-4 py-3 font-body text-sm outline-none transition focus:border-hipac-orange focus:ring-2 focus:ring-hipac-orange/10"
      />
    </div>
  );
}