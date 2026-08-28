import { useState } from "react";
import { ChevronDown, Send, Check } from "lucide-react";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Support Our Candidates", href: "/candidates" },
  { label: "Election Information", href: "/elections" },
  { label: "Get Involved", href: "/get-involved" },
];

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      smsConsent: formData.get("smsConsent") === "on",
    };

    console.log("Contact form submission:", data);

    // Later:
    // Send this data to your backend → Resend
  };

  return (
    <footer className="bg-hipac-brown text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.7fr_1.2fr]">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="flex shrink-0 items-center gap-3"
              aria-label="HiPAC - Hindus of Georgia"
            >
              <img
                src="/hipac-logo.webp"
                alt="HiPAC"
                className="h-12 w-auto"
              />

              <div className="flex flex-col leading-tight">
                <span className="font-accent text-xl font-extrabold tracking-tight">
                  HIPAC
                </span>

                <span className="font-accent text-xs font-medium text-white/75">
                  Hindus of Georgia
                </span>
              </div>
            </a>

            <p className="mt-5 max-w-sm font-body text-sm leading-6 text-white/75">
              Defending Faith, Freedom, and Families.
            </p>

            <p className="mt-3 max-w-sm font-body text-sm leading-6 text-white/75">
              Supporting candidates and causes important to the
              Hindu-American community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/75 transition-colors hover:text-hipac-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/donate"
              className="mt-7 inline-flex rounded-button bg-hipac-orange px-5 py-2.5 font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-hipac-brown"
            >
              Donate Now →
            </a>
          </div>

          {/* Contact Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setContactOpen(!contactOpen)}
              aria-expanded={contactOpen}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <h3 className="font-heading text-lg font-bold">
                  Get In Touch
                </h3>

                <p className="mt-1 font-body text-sm text-white/75">
                  Have a question? Send us a message.
                </p>
              </div>

              <ChevronDown
                size={22}
                className={`shrink-0 transition-transform duration-300 ${
                  contactOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`grid transition-all duration-300 ${
                contactOpen
                  ? "mt-5 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="h-11 w-full rounded-input border border-white/20 bg-white px-4 font-body text-sm text-hipac-dark outline-none placeholder:text-hipac-muted/70 focus:border-hipac-orange"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="h-11 w-full rounded-input border border-white/20 bg-white px-4 font-body text-sm text-hipac-dark outline-none placeholder:text-hipac-muted/70 focus:border-hipac-orange"
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    required
                    className="h-11 w-full rounded-input border border-white/20 bg-white px-4 font-body text-sm text-hipac-dark outline-none placeholder:text-hipac-muted/70 focus:border-hipac-orange"
                  />

                  {/* Message */}
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Your message"
                    required
                    className="w-full resize-none rounded-input border border-white/20 bg-white px-4 py-3 font-body text-sm text-hipac-dark outline-none placeholder:text-hipac-muted/70 focus:border-hipac-orange"
                  />

                  {/* SMS Consent */}
                  <label className="flex cursor-pointer items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      name="smsConsent"
                      className="mt-1 h-4 w-4 shrink-0 accent-hipac-orange"
                    />

                    <span className="font-body text-[11px] leading-4 text-white/65">
                      By providing your phone number and checking the box, you
                      are consenting to receive text message updates, including
                      automated text messages, to that number from Hindu PAC.
                      Message &amp; Data rates apply, and message frequency may
                      vary over time. Reply "STOP" to opt out of these text
                      message updates. Hindu PAC will not sell your data to any
                      outside entities.
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-button bg-hipac-orange px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-hipac-brown"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="font-body text-xs text-white/60">
            © {new Date().getFullYear()} HiPAC. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="font-body text-xs text-white/60 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}