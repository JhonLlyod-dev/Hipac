import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Share2,
  SearchX,
} from "lucide-react";

import PortableTextContent from "../components/PortableText";
import { sanityClient, urlFor } from "../lib/sanity";
import {
  articleBySlugQuery,
  nextArticleQuery,
} from "../lib/queries";

export default function Article() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [next, setNext] = useState(null);

  const [loading, setLoading] = useState(true);

  // ============================================================
  // FETCH ARTICLE
  // ============================================================

  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);

        const [articleData, articles] = await Promise.all([
          sanityClient.fetch(articleBySlugQuery, { slug }),
          sanityClient.fetch(nextArticleQuery),
        ]);

        setArticle(articleData);

        // Find the current article
        const currentIndex = articles.findIndex(
          (item) => item.slug === slug
        );

        // Get the next article
        if (currentIndex !== -1 && articles.length > 1) {
          const nextArticle =
            articles[(currentIndex + 1) % articles.length];

          if (nextArticle.slug !== slug) {
            setNext(nextArticle);
          }
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="bg-hipac-warm-white">
        <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-hipac-brown">
          <div className="absolute inset-0 animate-pulse bg-hipac-brown" />

          <div className="relative flex h-full flex-col justify-between px-5 py-8 lg:px-8 lg:py-10">
            <div className="h-5 w-32 animate-pulse rounded bg-white/10" />

            <div className="max-w-4xl">
              <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />

              <div className="mt-5 h-20 max-w-3xl animate-pulse rounded bg-white/10" />
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
            <div className="h-20 animate-pulse rounded bg-hipac-warm-white" />

            <div className="mt-12 space-y-5">
              <div className="h-5 animate-pulse rounded bg-hipac-warm-white" />
              <div className="h-5 animate-pulse rounded bg-hipac-warm-white" />
              <div className="h-5 animate-pulse rounded bg-hipac-warm-white" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-hipac-warm-white" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ============================================================
  // ARTICLE NOT FOUND
  // ============================================================

  if (!article) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-hipac-warm-white px-5">
        <div className="text-center">
          <SearchX
            className="mx-auto text-hipac-orange"
            size={32}
          />

          <p className="mt-6 font-heading text-7xl font-black text-hipac-orange">
            404
          </p>

          <h1 className="mt-3 font-heading text-3xl font-black text-hipac-brown">
            Article not found
          </h1>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-button bg-hipac-orange px-6 py-3 font-heading text-sm font-bold text-white"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  // ============================================================
  // HELPERS
  // ============================================================

  const category = article.category?.title || "Community";

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const image = urlFor(article.featuredImage);

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled the share dialog.
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (error) {
        console.error("Failed to copy article URL:", error);
      }
    }
  };

  return (
    <main className="bg-hipac-warm-white">
      {/* =========================================
          FULL-BLEED HERO
      ========================================= */}

      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-hipac-brown">
        {/* Featured Image */}
        {image && (
          <img
            src={image}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        )}

        {/* Gradient wash for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-hipac-brown via-hipac-brown/40 to-hipac-brown/10" />

        {/* Oversized article number */}
        {article.articleNumber && (
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 bottom-0 select-none font-heading text-[13rem] font-black leading-none text-white/[0.06] sm:text-[18rem]"
          >
            {article.articleNumber}
          </span>
        )}

        <div className="relative flex h-full flex-col justify-between px-5 py-8 lg:px-8 lg:py-10">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 font-heading text-xs font-bold uppercase tracking-[0.18em] text-white/60 transition hover:text-hipac-orange"
          >
            <ArrowLeft size={14} />
            Back to articles
          </Link>

          {/* Hero Content */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              {category && (
                <span className="rounded-full bg-hipac-orange px-3 py-1 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  {category}
                </span>
              )}

              {formattedDate && (
                <span className="flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wider text-white/50">
                  <Calendar size={13} />
                  {formattedDate}
                </span>
              )}
            </div>

            <h1 className="mt-5 font-heading text-4xl font-black leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* =========================================
          ARTICLE BODY
      ========================================= */}

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8 lg:py-20">
          {/* Deck / Excerpt */}
          {article.excerpt && (
            <p className="border-l-2 border-hipac-orange pl-5 font-body text-xl italic leading-8 text-hipac-brown sm:text-2xl">
              {article.excerpt}
            </p>
          )}

          {/* Portable Text Content */}
          <div className="mt-12">
            <PortableTextContent value={article.content} />
          </div>

          {/* Share */}
          <div className="mt-14 flex items-center justify-between border-y border-hipac-border py-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-hipac-brown">
              Hindu PAC &middot; {category}
            </p>

            <button
              type="button"
              onClick={handleShare}
              className="group flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-wider text-hipac-muted transition hover:text-hipac-orange"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hipac-border transition group-hover:border-hipac-orange">
                <Share2 size={13} />
              </span>

              <span className="hidden sm:inline">
                Share this article
              </span>

              <span className="sm:hidden">
                Share
              </span>
            </button>
          </div>

          {/* =========================================
              AUTHOR
          ========================================= */}

          {article.author && (
            <div className="mt-10 flex items-center gap-4">
              {article.author.photo ? (
                <img
                  src={urlFor(article.author.photo)}
                  alt={article.author.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-hipac-warm-white font-heading font-bold text-hipac-orange">
                  {article.author.name?.charAt(0)}
                </div>
              )}

              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-hipac-muted">
                  Written by
                </p>

                <p className="mt-0.5 font-heading text-sm font-bold text-hipac-brown">
                  {article.author.name}
                </p>
              </div>
            </div>
          )}

          {/* =========================================
              UP NEXT
          ========================================= */}

          {next && next.slug !== article.slug && (
            <Link
              to={`/${next.slug}`}
              className="group mt-10 flex items-center justify-between gap-6 rounded-button border border-hipac-border p-5 transition hover:border-hipac-orange"
            >
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-hipac-orange">
                  Up next
                </p>

                <p className="mt-1.5 font-heading text-lg font-black text-hipac-brown">
                  {next.title}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-hipac-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-hipac-orange"
              />
            </Link>
          )}
        </div>
      </section>

      {/* =========================================
          CTA
      ========================================= */}

      <section className="bg-hipac-orange">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center lg:px-8">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Get involved
            </p>

            <h2 className="mt-2 font-heading text-2xl font-black text-white sm:text-3xl">
              Make your voice part of the movement.
            </h2>
          </div>

          <Link
            to="/donate"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-button bg-hipac-brown px-6 py-3.5 font-heading text-sm font-bold text-white transition hover:bg-white hover:text-hipac-brown"
          >
            Support Hindu PAC
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}