import backgroundImage from "../assets/background-picture.webp";
import SEO from "../components/SEO";

const heroContent = {
  eyebrow: "Who We Are",
  title: "About HiPAC",
  description:
    "Building a strong, effective, and respected Hindu-American voice in Georgia and across the country.",
  backgroundImage: backgroundImage,
};

const introduction = {
  paragraphs: [
    "Hindus Of Georgia (aka HiPAC) is an independent, non-partisan political action committee for the Hindu American community of Georgia. We come together to identify and support local, state, and federal candidates who are committed to religious freedom, civil and human rights, and the wellbeing of Hindu Americans everywhere.",
    "Above all, we're committed to building a strong, effective, and respected Hindu-American voice in Georgia and across the country — one that grows stronger with every person who joins us.",
  ],
};

const objectives = {
  title: "What are our objectives?",
  paragraphs: [
    "Our first priority is simple: protect and promote the religious liberty and civil rights of every Hindu American. That means standing up for our community wherever those rights are threatened.",
    "We also work closely with candidates to help them understand the issues that matter most to us, from Hinduphobia and the way Hinduism is portrayed in school textbooks, to hate crimes against our places of worship and the bullying students face for holding Hindu beliefs. The more informed our elected officials are, the better they can represent us.",
    "Beyond that, we stay engaged on the broader policies that shape life for Hindu Americans, making sure our community's interests are never an afterthought.",
  ],
};

const candidateCriteria = {
  title: "What kind of candidates does HiPAC consider endorsing?",
  paragraphs: [
    "HiPAC offers support to candidates of any political party who are willing to stand with us. We look for leaders who condemn hatred, prejudice, bias, Hinduphobia, and bigotry against Hindus, and who take real action when it's brought to their attention, both in their campaigns and once in office.",
    "We support candidates who back legislation to combat terrorism, persecution, and discrimination affecting Hindus around the world, and who champion fair treatment of Hindu culture, beliefs, and history in our public schools.",
    "We also look for leaders committed to equal treatment for Hindus across civic and political life, including real opportunities to participate in campaigns, serve on boards and commissions, and take part in task forces. And we value candidates who show up for our community, joining in our cultural celebrations and building genuine friendships with Hindu Americans across Georgia.",
  ],
};

export default function About() {
  return (
    <main>

      <SEO 
        title={"About | Hindu PAC"}
        description={"Building a strong, effective, and respected Hindu-American voice in Georgia and across the country."}
      />
      <section className="relative overflow-hidden bg-hipac-brown">
        <div className="absolute inset-0">
          <img
            src={heroContent.backgroundImage}
            alt=""
            className="h-full w-full object-cover object-[75%_center] opacity-30"
          />
          <div className="absolute inset-0 bg-hipac-brown/80" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-hipac-orange">
              {heroContent.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {heroContent.title}
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-white/75">
              {heroContent.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl space-y-5">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph} className="font-body text-base leading-8 text-hipac-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-hipac-brown sm:text-4xl">
            {objectives.title}
          </h2>
          <div className="mt-6 space-y-5">
            {objectives.paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-body text-base leading-8 text-hipac-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-hipac-brown sm:text-4xl">
            {candidateCriteria.title}
          </h2>
          <div className="mt-6 space-y-5">
            {candidateCriteria.paragraphs.map((paragraph) => (
              <p key={paragraph} className="font-body text-base leading-8 text-hipac-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}