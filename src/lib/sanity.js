import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: "2026-08-29",
  useCdn: true,
});

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;

export function urlFor(imageId) {
  if (!imageId) return "";

  // Sanity may return either the full asset reference
  // or just the image asset ID.
  const ref =
    typeof imageId === "string"
      ? imageId
      : imageId.asset?._ref || imageId._ref || "";

  const match = ref.match(
    /^image-([a-f0-9]+)-(\d+x\d+)-([a-zA-Z0-9]+)$/
  );

  if (!match) {
    console.warn("Invalid Sanity image ID:", ref);
    return "";
  }

  const [, assetId, dimensions, extension] = match;

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}`;
}