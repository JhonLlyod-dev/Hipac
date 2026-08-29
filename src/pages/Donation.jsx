import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
} from "lucide-react";

import SEO from "../components/SEO";

import DonationForm from "../components/DonationForm";

const donationContent = {
  hero: {
    eyebrow: "Support Hindu PAC",
    title: "Donate to Hindu PAC",
    description:
      "Join our mission and help support candidates and causes important to the Hindu-American community.",
    backgroundImage:
      "https://hindusofgeorgia.com/wp-content/uploads/2024/09/Blue-and-White-Modern-Civil-Right-Day-A4-Flyer.png",
  },

  checkDonation: {
    title: "Donate by Check",
    description:
      "Those sending checks, please click the contribution form below.",
    formUrl:
      "https://hindusofgeorgia.com/wp-content/uploads/2024/09/pac-donation-form-1.pdf",
    address: [
      "Hindus of Georgia PAC",
      "Suite # 200",
      "7778 McGinnis Ferry Road",
      "Suwanee, GA 30024",
    ],
  },
};

export default function Donate() {
  return (
    <main>
      {/* ======================================================
          HERO
      ====================================================== */}
      <SEO
        title={"Donate | Hindu PAC"}
        description={"Join our mission and help support candidates and causes important to the Hindu-American community."}
      />
      <section className="relative overflow-hidden bg-hipac-brown">
        <div className="absolute inset-0">
          <img
            src={donationContent.hero.backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-hipac-brown/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-hipac-orange">
              {donationContent.hero.eyebrow}
            </p>

            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {donationContent.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-white/75">
              {donationContent.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN DONATION AREA
      ====================================================== */}

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* LEFT SIDE */}
          <div className="lg:sticky lg:top-24">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Join Our Mission
            </p>

            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-hipac-brown sm:text-5xl">
              Your support makes a difference.
            </h2>

            <p className="mt-6 font-body leading-7 text-hipac-muted">
              Your contribution helps Hindu PAC support candidates
              and causes that are important to the Hindu-American
              community.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Support candidates who stand with the Hindu community.",
                "Help strengthen the voice of Hindu Americans.",
                "Support political advocacy and community engagement.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-hipac-orange"
                  />

                  <p className="font-body text-sm leading-6 text-hipac-muted">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CHECK DONATION */}
            <div className="mt-10 rounded-2xl border border-hipac-border bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-hipac-orange/10 text-hipac-orange">
                  <Mail size={21} />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-hipac-brown">
                    {donationContent.checkDonation.title}
                  </h3>

                  <p className="mt-2 font-body text-sm leading-6 text-hipac-muted">
                    {donationContent.checkDonation.description}
                  </p>
                </div>
              </div>

              <a
                href="/donate-page-donation-form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-hipac-orange hover:text-hipac-brown"
              >
                <FileText size={16} />
                Download Contribution Form
                <ArrowRight size={16} />
              </a>

              <div className="mt-6 border-t border-hipac-border pt-5">
                <p className="font-heading text-xs font-bold uppercase tracking-wide text-hipac-muted">
                  Mail your contribution to
                </p>

                <address className="mt-2 not-italic font-body text-sm leading-6 text-hipac-brown">
                  {donationContent.checkDonation.address.map(
                    (line) => (
                      <div key={line}>{line}</div>
                    )
                  )}
                </address>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-2xl border border-hipac-border bg-white p-6 shadow-card sm:p-8 lg:p-10">
            <DonationForm />
          </div>
        </div>
      </section>

      {/* ======================================================
          DISCLAIMER
      ====================================================== */}

      <section className="border-t border-hipac-border bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="font-body text-center text-xs leading-6 text-hipac-muted">
            Contributions to HiPAC are not tax deductible as
            charitable contributions for Federal income tax
            purposes. HiPAC funds will be used for political
            purposes. Corporate contributions are not accepted.
          </p>
        </div>
      </section>
    </main>
  );
}