import {
  ArrowRight,
  ExternalLink,
  MapPin,
  UserRound,
} from "lucide-react";
import dayjs from "dayjs";

import SEO from "../components/SEO";
import { sanityClient } from "../lib/sanity";
import { electionInfoQuery } from "../lib/queries";

import { useState, useEffect } from "react";

// ============================================================
// PAGE CONTENT
// Replace these with Sanity data later.
// ============================================================

const heroContent = {
  eyebrow: "Stay Informed",
  title: "Election Information",
  description:
    "Stay informed, prepared, and engaged in the electoral process.",
  backgroundImage:
    "https://hindusofgeorgia.com/wp-content/uploads/2024/09/Blue-and-White-Modern-Civil-Right-Day-A4-Flyer.png",
};

const introduction = {
  title: "Your Voice Matters",
  paragraphs: [
    "Elections are the cornerstone of democracy, giving citizens the opportunity to shape their government and ensure that their voices are heard. As a member of the Hindu community in Georgia, it is vital to stay informed and engaged in the electoral process to advocate for the issues that matter most to you.",
    "In this section, you will find everything you need to make sure you’re ready for the next election. We’ve compiled important dates, such as registration deadlines and election days, so you won’t miss your chance to vote. Additionally, there are links to help you check your voter registration status, find your polling location, and confirm your district to ensure you’re voting in the correct races.",
    "Whether you’re voting for local leaders or in national elections, being informed and prepared is the best way to make a difference in your community.",
  ],
};

// ============================================================
// VOTER RESOURCES
// ============================================================

const voterResources = [
  {
    title: "My Voter Page",
    description:
      "Check your registration status, request an absentee ballot, see a sample ballot, and check key election dates.",
    buttonLabel: "Go to My Voter Page",
    href: "https://mvp.sos.ga.gov/s/",
    icon: MapPin,
    external: true,
  },
  {
    title: "Find Your Representative",
    description:
      "Don’t know who represents you? Use this resource to find your state and local legislators.",
    buttonLabel: "Find Your Representative",
    href: "https://pluralpolicy.com/",
    icon: MapPin,
    external: true,
  },
  {
    title: "Hindu PAC Endorsed Candidates",
    description:
      "See the list of elected officials and candidates endorsed by Hindu PAC.",
    buttonLabel: "See Endorsed Candidates",
    href: "/candidates",
    icon: UserRound,
    external: false,
  },
];

// ============================================================
// DATE CARD (big, 4-up grid)
// ============================================================

function DateCard({ title, date, description, isFeatured }) {
  const parsed = date ? dayjs(date) : null;

  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-6 shadow-card transition-all duration-300 hover:-translate-y-1 ${
        isFeatured
          ? "border-hipac-orange/40 bg-hipac-orange/5"
          : "border-hipac-border bg-white"
      }`}
    >
      {/* Date badge */}
      <div
        className={`flex w-fit flex-col items-center justify-center rounded-xl px-4 py-3 text-center w-full ${
          isFeatured
            ? "bg-hipac-orange text-white"
            : "bg-hipac-brown text-white"
        }`}
      >
        {parsed ? (
          <div className="flex items-center justify-center gap-3">
            {/* Day */}
            <span className="font-heading text-6xl font-extrabold leading-[0.8] tracking-tight">
              {parsed.format("DD")}
            </span>

            {/* Month + Year */}
            <div className="flex flex-col justify-center">
              <span className="font-heading text-sm font-bold uppercase leading-none tracking-wide">
                {parsed.format("MMM")}
              </span>

              <span className="mt-1 font-heading text-xs font-bold uppercase leading-none tracking-wide text-white/70">
                {parsed.format("YYYY")}
              </span>
            </div>
          </div>
        ) : (
          <span className="font-heading text-xs font-bold uppercase">
            TBD
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-hipac-brown">
          {title}
        </h3>

        {description && (
          <p className="mt-2 font-body text-sm leading-6 text-hipac-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ElectionsInfo() {
  const [electionInfo, setElectionInfo] = useState(null);

  useEffect(() => {
    async function fetchElectionInfo() {
      try {
        const data = await sanityClient.fetch(electionInfoQuery);
        setElectionInfo(data);
      } catch (error) {
        console.error("Failed to fetch election info:", error);
      }
    }

    fetchElectionInfo();
  }, []);

  const sortedDates = (electionInfo?.importantDates ?? [])
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <main>
      {/* ======================================================
          HERO
      ====================================================== */}

      <SEO
        title={"Election Information | Hindu  PAC"}
        description={"Stay informed, prepared, and engaged in the electoral process."}
      />

      <section className="relative overflow-hidden bg-hipac-brown">
        <div className="absolute inset-0">
          <img
            src={heroContent.backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-hipac-brown/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-hipac-orange">
              {heroContent.eyebrow}
            </p>

            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {heroContent.title}
            </h1>

            <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-white/75">
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          MARK YOUR CALENDAR (big cards, 4-up)
      ====================================================== */}

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
                Mark Your Calendar
              </p>

              <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-hipac-brown sm:text-5xl">
                Important Election Dates
              </h2>

              <p className="mt-5 font-body leading-7 text-hipac-muted">
                Keep track of the important dates so you can be prepared to
                participate in the election.
              </p>
            </div>

            {electionInfo?.name && (
              <div className="flex items-center gap-3 rounded-2xl bg-hipac-brown px-5 py-4 text-white">
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wide text-white/50">
                    Current Election
                  </p>

                  <p className="font-heading text-sm font-bold">
                    {electionInfo.name}
                  </p>

                  {electionInfo.electionDate && (
                    <p className="font-body text-xs text-white/60">
                      {dayjs(electionInfo.electionDate).format(
                        "MMMM D, YYYY"
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Big date cards, at least 4 per line on large screens */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sortedDates.length > 0 ? (
              sortedDates.map((item) => (
                <DateCard
                  key={item._key ?? `${item.title}-${item.date}`}
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  isFeatured={item.isFeatured}
                />
              ))
            ) : (
              <p className="font-body text-sm text-hipac-muted">
                Election dates will be posted here soon.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          ELECTION INFORMATION (intro, below dates)
      ====================================================== */}

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Election Information
            </p>

            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-hipac-brown sm:text-5xl">
              {introduction.title}
            </h2>
          </div>

          <div className="space-y-5">
            {introduction.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-base leading-8 text-hipac-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {electionInfo?.description && (
            <p className="mt-5 font-body text-base leading-8 text-hipac-muted">
              {electionInfo.description}
            </p>
          )}
        </div>
      </section>

      {/* ======================================================
          VOTER RESOURCES
      ====================================================== */}

      <section className="bg-hipac-brown px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Voter Resources
            </p>

            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Be ready to make your voice heard.
            </h2>

            <p className="mt-5 font-body leading-7 text-white/70">
              Use these resources to check your voter information, learn who
              represents you, and see the candidates supported by Hindu PAC.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {voterResources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.title}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hipac-orange text-white">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 font-heading text-xl font-bold">
                    {resource.title}
                  </h3>

                  <p className="mt-3 flex-1 font-body text-sm leading-6 text-white/65">
                    {resource.description}
                  </p>

                  <a
                    href={resource.href}
                    {...(resource.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold text-hipac-orange transition-colors hover:text-white"
                  >
                    {resource.buttonLabel}

                    {resource.external ? (
                      <ExternalLink size={16} />
                    ) : (
                      <ArrowRight size={16} />
                    )}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="bg-hipac-orange px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            Get Involved
          </p>

          <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
            Your voice can make a difference.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl font-body leading-7 text-white/80">
            Stay informed, participate in elections, and support candidates
            who stand with the Hindu community.
          </p>

          <a
            href="/candidates"
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-white px-7 py-4 font-heading text-sm font-bold uppercase tracking-wide text-hipac-brown transition-colors hover:bg-hipac-brown hover:text-white"
          >
            See Our Candidates
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}