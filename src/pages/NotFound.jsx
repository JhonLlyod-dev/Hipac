import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-hipac-warm-white">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-hipac-orange/5" />

        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-hipac-brown/5" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-hipac-orange/10 text-hipac-orange">
            <SearchX size={30} strokeWidth={1.8} />
          </div>

          {/* 404 */}
          <p className="mt-8 font-heading text-8xl font-extrabold leading-none tracking-tighter text-hipac-orange sm:text-9xl">
            404
          </p>

          {/* Heading */}
          <h1 className="mt-5 font-heading text-3xl font-extrabold tracking-tight text-hipac-brown sm:text-4xl lg:text-5xl">
            Page not found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-7 text-hipac-muted sm:text-lg">
            The page you’re looking for may have been moved, removed,
            or the address may be incorrect.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-button bg-hipac-orange px-6 py-3.5 font-heading text-sm font-bold text-white transition-all hover:bg-hipac-brown sm:w-auto"
            >
              <Home size={17} />
              Back to Home
            </a>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-button border border-hipac-border bg-white px-6 py-3.5 font-heading text-sm font-bold text-hipac-brown transition-all hover:border-hipac-orange hover:text-hipac-orange sm:w-auto"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
          </div>

          {/* Bottom message */}
          <div className="mx-auto mt-14 max-w-lg border-t border-hipac-border pt-7">
            <p className="font-body text-sm text-hipac-muted">
              Looking for information about Hindu PAC?
            </p>

            <a
              href="/"
              className="mt-2 inline-block font-heading text-sm font-bold text-hipac-orange hover:text-hipac-brown"
            >
              Explore Hindu PAC →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}