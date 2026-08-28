import { useState } from "react";

const navItems = [
  { label: "Support Our Candidates", href: "/candidates" },
  { label: "Election Information", href: "/elections" },
  { label: "About", href: "/about" },
  { label: "Get Involved", href: "/get-involved" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hipac-border bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
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
          <span className="font-accent text-xl font-extrabold tracking-tight text-hipac-brown">
            HIPAC
          </span>

          <span className="font-accent text-xs font-bold text-hipac-muted">
            Hindus of Georgia
          </span>
        </div>
      </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body text-sm font-medium text-hipac-dark transition-colors hover:text-hipac-orange"
            >
              {item.label}
            </a>
          ))}

          <a
            href="/donate"
            className="rounded-button bg-hipac-orange px-5 py-2.5 font-heading text-sm font-bold text-white transition-all hover:bg-hipac-brown"
          >
            Donate
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-hipac-brown lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-hipac-border bg-white px-5 pb-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-hipac-border py-4 font-body text-sm font-medium text-hipac-dark transition-colors hover:text-hipac-orange"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="mt-5 rounded-button bg-hipac-orange px-5 py-3 text-center font-heading text-sm font-bold text-white transition-colors hover:bg-hipac-brown"
            >
              Donate
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}