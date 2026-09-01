
import { ArrowUpRight } from "lucide-react";

export default function CandidateCard({
  name,
  image,
  title,
  slug,
}) {

  return (
    <a
      href={"/candidates"}
      className="group block overflow-hidden rounded-2xl border border-hipac-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-hipac-warm-white">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center">
            <span className="font-body text-sm text-hipac-muted">
              No image available
            </span>
          </div>
        )}

        {/* Hover Icon */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-hipac-brown opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {title && (
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-hipac-orange">
            {title}
          </p>
        )}

        <h3 className="mt-1 font-heading text-base font-bold leading-snug text-hipac-brown">
          {name}
        </h3>
      </div>
    </a>
  );
}

