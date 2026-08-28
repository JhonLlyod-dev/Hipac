import {
  Database,
  Users,
  FileText,
  Tags,
  Target,
  Vote,
  Link as LinkIcon,
  Scale,
  Settings,
  Menu,
  Mail,
} from "lucide-react";

const schemas = [
  {
    name: "Site Settings",
    type: "siteSettings",
    icon: Settings,
    description: "Global information used throughout the website.",
    fields: [
      ["siteName", "String", "Hindus of Georgia PAC"],
      ["shortName", "String", "HiPAC"],
      ["tagline", "String", "Defending Faith, Freedom, and Families."],
      ["description", "Text", "Website description"],
      ["logo", "Image", "HiPAC logo"],
      ["favicon", "Image", "Browser favicon"],
      ["defaultOgImage", "Image", "Default social sharing image"],
      ["contactEmail", "Email", "Official contact email"],
      ["phone", "String", "Official phone number"],
      ["address", "Object", "Organization address"],
      ["socialLinks", "Array", "Social media accounts"],
    ],
  },

  {
    name: "Candidate",
    type: "candidate",
    icon: Users,
    description: "One document for every endorsed or supported candidate.",
    fields: [
      ["name", "String", "Rich McCormick"],
      ["title", "String", "Congressman"],
      ["slug", "Slug", "rich-mccormick"],
      ["photo", "Image", "Candidate portrait"],
      ["party", "String", "Political party"],
      ["office", "String", "Office they hold or are seeking"],
      ["district", "String", "District information"],
      ["location", "String", "Georgia"],
      ["category", "Reference", "Georgia Congressmen"],
      ["status", "String", "Endorsed / Candidate / Incumbent"],
      ["bio", "Text", "Candidate biography"],
      ["website", "URL", "Official website"],
      ["socialLinks", "Array", "Candidate social accounts"],
      ["electionYear", "Number", "2026"],
      ["isFeatured", "Boolean", "Show on homepage"],
      ["displayOrder", "Number", "1"],
    ],
  },

  {
    name: "Article",
    type: "article",
    icon: FileText,
    description: "News, announcements, community information, and editorial content.",
    fields: [
      ["title", "String", "Article title"],
      ["slug", "Slug", "article-001-example-title"],
      ["articleNumber", "String", "01"],
      ["category", "Reference", "Article category"],
      ["excerpt", "Text", "Short article description"],
      ["featuredImage", "Image", "Main article image"],
      ["publishedAt", "Date", "Publication date"],
      ["author", "String / Reference", "Article author"],
      ["content", "Portable Text", "Full article content"],
      ["featured", "Boolean", "Show on homepage"],
      ["seo", "Object", "SEO information"],
    ],
  },

  {
    name: "Article Category",
    type: "articleCategory",
    icon: Tags,
    description: "Categories used to organize articles.",
    fields: [
      ["title", "String", "Community"],
      ["slug", "Slug", "community"],
      ["description", "Text", "Category description"],
    ],
  },

  {
    name: "Focus Area",
    type: "focusArea",
    icon: Target,
    description: "The main areas HiPAC focuses on.",
    fields: [
      ["title", "String", "Legislative Action"],
      ["slug", "Slug", "legislative-action"],
      ["description", "Text", "Focus area description"],
      ["image", "Image", "Focus area image"],
      ["icon", "String", "landmark"],
      ["link", "URL", "Destination page"],
      ["displayOrder", "Number", "1"],
      ["isFeatured", "Boolean", "Show on homepage"],
    ],
  },

  {
    name: "Election",
    type: "election",
    icon: Vote,
    description: "Election dates and information.",
    fields: [
      ["name", "String", "2026 General Election"],
      ["electionDate", "Date", "Election day"],
      ["description", "Text", "Election description"],
      ["importantDates", "Array of Objects", "Registration, early voting, absentee dates"],
      ["voterResources", "Array", "Useful voter links"],
      ["isCurrent", "Boolean", "Current election"],
    ],
  },

  {
    name: "Resource Link",
    type: "resourceLink",
    icon: LinkIcon,
    description: "Useful external resources for voters and the community.",
    fields: [
      ["title", "String", "My Voter Page"],
      ["description", "Text", "Resource description"],
      ["url", "URL", "https://..."],
      ["type", "String", "Voter / Representative / Election"],
      ["displayOrder", "Number", "1"],
    ],
  },

  {
    name: "Contact Information",
    type: "contactInfo",
    icon: Mail,
    description: "Public contact information displayed on the website.",
    fields: [
      ["title", "String", "Get in Touch"],
      ["description", "Text", "Contact description"],
      ["email", "Email", "Official email"],
      ["phone", "String", "Phone number"],
      ["address", "Object", "Office address"],
      ["officeHours", "String", "Office hours"],
      ["socialLinks", "Array", "Social accounts"],
    ],
  },

  {
    name: "Legal Page",
    type: "legalPage",
    icon: Scale,
    description: "Privacy Policy, Terms, and other legal documents.",
    fields: [
      ["title", "String", "Privacy Policy"],
      ["slug", "Slug", "privacy"],
      ["lastUpdated", "Date", "Last updated date"],
      ["content", "Portable Text", "Legal document content"],
    ],
  },

  {
    name: "Navigation",
    type: "navigation",
    icon: Menu,
    description: "Website navigation links.",
    fields: [
      ["headerLinks", "Array", "Navigation menu items"],
      ["label", "String", "Support Our Candidates"],
      ["href", "URL / String", "/candidates"],
    ],
  },
];

function FieldType({ type }) {
  const styles = {
    String: "bg-blue-50 text-blue-700",
    Text: "bg-purple-50 text-purple-700",
    Image: "bg-green-50 text-green-700",
    Slug: "bg-orange-50 text-orange-700",
    Reference: "bg-pink-50 text-pink-700",
    Array: "bg-yellow-50 text-yellow-700",
    "Array of Objects": "bg-yellow-50 text-yellow-700",
    Boolean: "bg-gray-100 text-gray-700",
    Number: "bg-cyan-50 text-cyan-700",
    Date: "bg-indigo-50 text-indigo-700",
    URL: "bg-red-50 text-red-700",
    Email: "bg-teal-50 text-teal-700",
    "Portable Text": "bg-emerald-50 text-emerald-700",
    Object: "bg-violet-50 text-violet-700",
    "String / Reference": "bg-pink-50 text-pink-700",
    "URL / String": "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        styles[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type}
    </span>
  );
}

function SchemaCard({ schema }) {
  const Icon = schema.icon;

  return (
    <section className="overflow-hidden rounded-2xl border border-hipac-border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-hipac-border bg-hipac-warm-white px-6 py-5">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-hipac-orange/10 text-hipac-orange">
            <Icon size={21} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-xl font-extrabold text-hipac-brown">
                {schema.name}
              </h2>

              <code className="rounded-md bg-hipac-brown px-2 py-1 text-[10px] font-bold text-white">
                {schema.type}
              </code>
            </div>

            <p className="mt-1 font-body text-sm text-hipac-muted">
              {schema.description}
            </p>
          </div>
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-hipac-border">
        {schema.fields.map(([field, type, example]) => (
          <div
            key={`${schema.type}-${field}`}
            className="grid gap-3 px-6 py-4 sm:grid-cols-[190px_130px_1fr] sm:items-center"
          >
            <div>
              <code className="font-mono text-sm font-semibold text-hipac-brown">
                {field}
              </code>
            </div>

            <div>
              <FieldType type={type} />
            </div>

            <div className="font-body text-sm text-hipac-muted">
              {example}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ContentSchema() {
  return (
    <main className="min-h-screen bg-hipac-warm-white">

      {/* Header */}
      <section className="bg-hipac-brown px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex items-center gap-3 text-hipac-orange">
            <Database size={18} />

            <span className="font-heading text-xs font-bold uppercase tracking-[0.2em]">
              Content Architecture
            </span>
          </div>

          <h1 className="mt-4 font-heading text-4xl font-black tracking-tight text-white sm:text-5xl">
            HiPAC Sanity Schema
          </h1>

          <p className="mt-4 max-w-2xl font-body text-base leading-7 text-white/60">
            A visual reference for the content fields that should be
            created in Sanity Studio.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">

          {/* Quick summary */}
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl border border-hipac-border bg-white p-5">
              <p className="font-heading text-3xl font-black text-hipac-orange">
                10
              </p>

              <p className="mt-1 font-body text-sm text-hipac-muted">
                Content types
              </p>
            </div>

            <div className="rounded-xl border border-hipac-border bg-white p-5">
              <p className="font-heading text-3xl font-black text-hipac-orange">
                CMS
              </p>

              <p className="mt-1 font-body text-sm text-hipac-muted">
                Sanity powered
              </p>
            </div>

            <div className="rounded-xl border border-hipac-border bg-white p-5">
              <p className="font-heading text-3xl font-black text-hipac-orange">
                PT
              </p>

              <p className="mt-1 font-body text-sm text-hipac-muted">
                Portable Text articles
              </p>
            </div>

            <div className="rounded-xl border border-hipac-border bg-white p-5">
              <p className="font-heading text-3xl font-black text-hipac-orange">
                1×
              </p>

              <p className="mt-1 font-body text-sm text-hipac-muted">
                Reusable candidate model
              </p>
            </div>

          </div>

          {/* Schemas */}
          <div className="space-y-8">
            {schemas.map((schema) => (
              <SchemaCard
                key={schema.type}
                schema={schema}
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}