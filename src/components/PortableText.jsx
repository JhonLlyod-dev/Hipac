import { PortableText } from "@portabletext/react";
import { urlFor } from "../lib/sanity";

const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-7 last:mb-0">
        {children}
      </p>
    ),

    h1: ({ children }) => (
      <h2 className="mb-6 mt-12 font-heading text-4xl font-black leading-tight text-hipac-brown sm:text-5xl">
        {children}
      </h2>
    ),

    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 font-heading text-3xl font-black leading-tight text-hipac-brown sm:text-4xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 font-heading text-2xl font-black leading-tight text-hipac-brown sm:text-3xl">
        {children}
      </h3>
    ),

    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 font-heading text-xl font-bold text-hipac-brown">
        {children}
      </h4>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-hipac-orange pl-5 font-body text-xl italic leading-8 text-hipac-brown">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-hipac-brown">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em>{children}</em>
    ),

    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),

    link: ({ value, children }) => {
      const href = value?.href;

      if (!href) return children;

      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="font-medium text-hipac-orange underline decoration-hipac-orange/40 underline-offset-4 transition hover:text-hipac-brown"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-7 ml-6 list-disc space-y-2">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="mb-7 ml-6 list-decimal space-y-2">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1">{children}</li>
    ),

    number: ({ children }) => (
      <li className="pl-1">{children}</li>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <figure className="my-10">
          <img
            src={urlFor(value)}
            alt={value.alt || ""}
            className="w-full rounded-xl object-cover"
          />

          {value.caption && (
            <figcaption className="mt-3 font-body text-sm leading-6 text-hipac-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextContent({ value }) {
  if (!value) return null;

  return (
    <div className="font-body text-lg leading-[1.85] text-hipac-muted sm:text-xl">
      <PortableText value={value} components={components} />
    </div>
  );
}