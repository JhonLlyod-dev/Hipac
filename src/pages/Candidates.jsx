import { useEffect, useState } from "react";
import { ArrowRight, Landmark, Megaphone, Users } from "lucide-react";

import CandidateCard from "../components/CandidateCard";
import SEO from "../components/SEO";

import { sanityClient, urlFor } from "../lib/sanity";
import { candidatesPageQuery } from "../lib/queries";

// ============================================================
// PAGE CONTENT
// ============================================================

const heroContent = {
  eyebrow: "Hindu PAC",
  title: "Support Our Candidates",
  description:
    "Hindu PAC stands with candidates who stand with the Hindu community. Together, we can make our voice stronger and our influence greater.",
  backgroundImage: "/blue-and-white-modern-cvil-right-day.webp",
};

// ============================================================
// WHY SUPPORT
// ============================================================

const supportReasons = [
  {
    title: "Money with a Hindu Message",
    description:
      "When you contribute to Hindu PAC, you send a clear and unmistakable message that elected officials and candidates can’t forsake the Hindu community.",
    icon: Megaphone,
  },
  {
    title: "Lend Your Voice to a Hindu Team",
    description:
      "If you give to a candidate, your resources help in one race. When you give to Hindu PAC, your money promotes a whole team of Hindu candidates.",
    icon: Users,
  },
  {
    title: "Grow Hindu PAC’s Influence",
    description:
      "The more resources we have to spread our message and impact culture, the farther our influence grows and the more impact we have TOGETHER to support the Hindu community.",
    icon: Landmark,
  },
];

// ============================================================
// CANDIDATE CATEGORY
// ============================================================
// Categories now come straight from Sanity, already sorted by
// displayOrder. No hardcoded slug list to maintain — add a new
// category in Sanity and it just shows up here.

function CandidateCategory({ group, number }) {
  return (
    <section className="text-center">
      {/* ======================================================
          DIVIDER
      ====================================================== */}

      <div className="mx-auto mb-14 flex max-w-3xl items-center gap-5">
        <div className="h-px flex-1 bg-hipac-border" />

        <span className="font-heading text-xs font-extrabold tracking-[0.2em] text-hipac-orange">
          {number}
        </span>

        <div className="h-px flex-1 bg-hipac-border" />
      </div>

      {/* ======================================================
          CATEGORY HEADER
      ====================================================== */}

      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-hipac-brown sm:text-4xl">
          {group.title}
        </h2>

        {group.description && (
          <p className="mx-auto mt-3 max-w-2xl font-body text-sm leading-6 text-hipac-muted">
            {group.description}
          </p>
        )}
      </div>

      {/* ======================================================
          CANDIDATES
      ====================================================== */}

      {group.candidates.length > 0 ? (
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {group.candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="w-full sm:w-[260px] lg:w-[270px]"
            >
              <CandidateCard
                name={candidate.name}
                title={candidate.title}
                slug={candidate.slug}
                image={urlFor(candidate.photo)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 font-body text-sm text-hipac-muted">
          No candidates available in this category.
        </p>
      )}
    </section>
  );
}

// ============================================================
// LOADING SKELETON
// ============================================================

function CandidatesLoading() {
  return (
    <div className="space-y-20">
      {[1, 2, 3].map((category) => (
        <section key={category}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-3 w-12 animate-pulse rounded bg-hipac-warm-white" />
            <div className="mx-auto mt-6 h-8 w-56 animate-pulse rounded bg-hipac-warm-white" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-5">
            {[1, 2, 3, 4].map((candidate) => (
              <div
                key={candidate}
                className="h-72 w-full animate-pulse rounded-2xl bg-hipac-warm-white sm:w-[260px]"
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// ============================================================
// PAGE
// ============================================================

export default function Candidates() {
  const [candidateGroups, setCandidateGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH CANDIDATES
  // ============================================================

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const data = await sanityClient.fetch(candidatesPageQuery);

        setCandidateGroups(data || []);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  return (
    <main>
      {/* ======================================================
          SEO
      ====================================================== */}

      <SEO
        title="Support Our Candidates | Hindu PAC"
        description="Supporting candidates and causes important to the Hindu-American community."
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-hipac-brown">
        <div className="absolute inset-0">
          <img
            src={heroContent.backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-hipac-brown/75" />
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
          WHY SUPPORT
      ====================================================== */}

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Why Hindu PAC
            </p>

            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-hipac-brown sm:text-4xl">
              Make your support go further.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {supportReasons.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="relative rounded-2xl border border-hipac-border bg-white p-7 shadow-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-hipac-orange/10 text-hipac-orange">
                    <Icon size={22} />
                  </div>

                  <span className="absolute right-6 top-6 font-heading text-4xl font-extrabold text-hipac-brown/5">
                    0{index + 1}
                  </span>

                  <h3 className="mt-6 font-heading text-xl font-bold text-hipac-brown">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-body text-sm leading-6 text-hipac-muted">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          CANDIDATES
      ====================================================== */}

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* ==================================================
              PAGE INTRO
          ================================================== */}

          <div className="mb-20 max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Our Candidates
            </p>

            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-hipac-brown sm:text-5xl">
              Who We Support
            </h2>

            <p className="mt-5 font-body leading-7 text-hipac-muted">
              Explore the candidates and elected officials supported by Hindu
              PAC across state and local government.
            </p>
          </div>

          {/* ==================================================
              LOADING / CONTENT / EMPTY
          ================================================== */}

          {loading ? (
            <CandidatesLoading />
          ) : candidateGroups.length > 0 ? (
            <div className="space-y-28">
              {candidateGroups.map((group, index) => (
                <CandidateCategory
                  key={group._id}
                  group={group}
                  number={String(index + 1).padStart(2, "0")}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-heading text-xl font-bold text-hipac-brown">
                No candidates found.
              </p>

              <p className="mt-2 font-body text-sm text-hipac-muted">
                Please check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="bg-hipac-orange px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              Make an Impact
            </p>

            <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Help us strengthen the Hindu voice.
            </h2>

            <p className="mt-3 max-w-xl font-body text-white/80">
              Your support helps Hindu PAC promote candidates and causes
              important to the Hindu-American community.
            </p>
          </div>

          <a
            href="/donate"
            className="inline-flex shrink-0 items-center gap-2 rounded-button bg-white px-7 py-4 font-heading text-sm font-bold uppercase tracking-wide text-hipac-brown transition-colors hover:bg-hipac-brown hover:text-white"
          >
            Donate Now
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}