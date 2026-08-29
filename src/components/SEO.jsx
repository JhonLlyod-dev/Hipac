import { useEffect } from "react";

export default function SEO({
  title,
  description,
  image,
}) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    const setProperty = (property, content) => {
      let meta = document.querySelector(
        `meta[property="${property}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    setMeta("description", description);

    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:image", image || "/og-image.webp");
    setProperty("og:type", "website");

    setProperty("twitter:card", "summary_large_image");
    setProperty("twitter:title", title);
    setProperty("twitter:description", description);
    setProperty("twitter:image", image);
  }, [title, description, image]);

  return null;
}