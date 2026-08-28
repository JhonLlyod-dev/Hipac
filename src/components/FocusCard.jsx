import { ArrowRight } from "lucide-react";

export default function FocusCard({
  title,
  description,
  image,
  href,
}) {
  return (
    <article className="group overflow-hidden rounded-card border border-hipac-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-hipac-brown/20" />

      </div>

      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-hipac-brown">
          {title}
        </h3>

        <p className="mt-3 font-body text-sm leading-6 text-hipac-muted">
          {description}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-bold text-hipac-orange transition-colors hover:text-hipac-brown"
        >
          Learn More
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  );
}