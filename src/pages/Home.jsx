import { useEffect, useState } from "react";
import { ArrowRight, Landmark, Users, ShieldCheck } from "lucide-react";
import FocusCard from "../components/FocusCard";
import CandidateCard from "../components/CandidateCard";
import SEO from "../components/SEO";
import { sanityClient, urlFor } from "../lib/sanity";
import {
  homeCandidatesQuery,
  homeFocusArticlesQuery,
} from "../lib/queries";

// ============================================================
// STATIC HERO CONTENT
// ============================================================

const heroContent = {
  eyebrow: "Hindu PAC",
  title: "THE LARGEST HINDU PAC IN NORTH AMERICA",
  description:
    "Standing with candidates and causes that support the Hindu-American community.",
  image:
    "https://hindusofgeorgia.com/wp-content/uploads/2024/09/The-Largest-Hindu-PAC-In-America-1-1-1536x864.png",
  button: {
    label: "Who We Support",
    href: "/candidates",
  },
};

// ============================================================
// ICON MAPPING
// Category comes from Sanity.
// Icons remain in React because Lucide icons cannot be stored
// directly in Sanity.
// ============================================================

const focusIcons = {
  "Legislative Action": Landmark,
  "Civic Engagement": Users,
  "Religious Freedom": ShieldCheck,
};

export default function Home() {
  const [supportedCandidates, setSupportedCandidates] = useState([]);
  const [focusItems, setFocusItems] = useState([]);

  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadingFocus, setLoadingFocus] = useState(true);

  // ============================================================
  // FETCH HOMEPAGE DATA
  // ============================================================

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const [candidates, focusArticles] = await Promise.all([
          sanityClient.fetch(homeCandidatesQuery),
          sanityClient.fetch(homeFocusArticlesQuery),
        ]);

        setSupportedCandidates(candidates || []);
        setFocusItems(focusArticles || []);
      } catch (error) {
        console.error("Failed to fetch homepage data:", error);
      } finally {
        setLoadingCandidates(false);
        setLoadingFocus(false);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <main>
      {/* ======================================================
          HERO
      ====================================================== */}

      <SEO title={"Hindu PAC | Supporting the Hindu-American Community"} description={"Hindu PAC is a  Hindu political action committee supporting candidates, civic engagement, legislative action, and religious freedom."} />

      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-hipac-brown">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/blue-and-white-modern-cvil-right-day.webp"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-hipac-brown/10" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-2">
            {/* Hero Text */}
            <div className="max-w-2xl">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-hipac-orange">
                {heroContent.eyebrow}
              </p>

              <h1 className="mt-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
                {heroContent.title}
              </h1>

              <p className="mt-7 max-w-xl font-body text-lg leading-8 text-white/75">
                {heroContent.description}
              </p>

              <a
                href={heroContent.button.href}
                className="mt-9 inline-flex items-center gap-2 rounded-button bg-hipac-orange px-7 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-hipac-brown"
              >
                {heroContent.button.label}
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-container bg-hipac-orange/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-container">
                <img
                  src={heroContent.image}
                  alt={heroContent.title}
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          OUR FOCUS
      ====================================================== */}

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Our Focus
            </p>

            <h2 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-hipac-brown sm:text-5xl">
              Working for our community.
            </h2>

            <p className="mt-5 font-body leading-7 text-hipac-muted">
              Our work focuses on civic participation, legislative action,
              and protecting religious freedom.
            </p>
          </div>

          {/* Focus Cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {loadingFocus ? (
              <>
                <div className="h-80 animate-pulse rounded-container bg-hipac-brown/10" />
                <div className="h-80 animate-pulse rounded-container bg-hipac-brown/10" />
                <div className="h-80 animate-pulse rounded-container bg-hipac-brown/10" />
              </>
            ) : focusItems.length > 0 ? (
              focusItems.map((article) => {
                const categoryTitle = article.category?.title;
                const Icon = focusIcons[categoryTitle];

                return (
                  <FocusCard
                    key={article._id}
                    title={article.title}
                    description={article.excerpt}
                    image={urlFor(article.featuredImage)}
                    href={`/${article.slug}`}
                    icon={Icon}
                  />
                );
              })
            ) : (
              <p className="font-body text-hipac-muted">
                No focus articles available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          CANDIDATES
      ====================================================== */}

      <section className="bg-hipac-brown px-5 py-20 text-white lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-hipac-orange">
              Our Candidates
            </p>

            <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              HINDU PAC STANDS WITH THOSE WHO STAND WITH HINDUS
            </h2>

            <p className="mt-6 max-w-2xl font-body leading-7 text-white/70">
              We support candidates who stand with our community and share our
              commitment to protecting our values and interests.
            </p>
          </div>

          {/* Candidate Cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loadingCandidates ? (
              <>
                <div className="h-64 animate-pulse rounded-container bg-white/10" />
                <div className="h-64 animate-pulse rounded-container bg-white/10" />
                <div className="h-64 animate-pulse rounded-container bg-white/10" />
              </>
            ) : supportedCandidates.length > 0 ? (
              supportedCandidates.map((candidate) => (
              <CandidateCard
                key={candidate._id}
                name={candidate.name}
                title={candidate.title}
                slug={candidate.slug}
                image={urlFor(candidate.photo)}
              />
              ))
            ) : (
              <p className="font-body text-white/60">
                No candidates available.
              </p>
            )}
          </div>

          <div className="mt-10">
            <a
              href="/candidates"
              className="inline-flex items-center gap-2 rounded-button bg-hipac-orange px-6 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-hipac-brown"
            >
              Who We Support
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================
          DONATE CTA
      ====================================================== */}

      <section className="bg-hipac-orange px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              Support Our Mission
            </p>

            <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
              Make your voice count.
            </h2>

            <p className="mt-3 max-w-xl font-body text-white/80">
              Support the work of Hindu PAC and help advance the interests of
              the Hindu-American community.
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