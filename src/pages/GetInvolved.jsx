import { useState } from "react";
import {
  CheckCircle2,
  UserX,
  ChevronDown,
} from "lucide-react";

import backgroundImage from "../assets/background-picture.webp";

const heroContent = {
  eyebrow: "Get Involved",
  title: "Election Involvement Toolkit",
  description:
    "Ways to participate in U.S. elections at any age or immigration status.",
  backgroundImage: backgroundImage,
};

const involvementCards = [
  {
    title: "US Citizen",
    subtitle: "Adult",
    color: "bg-hipac-orange",
    textColor: "text-hipac-orange",
    items: [
      { label: "Vote", allowed: true },
      { label: "Work as Poll Workers", allowed: true },
      { label: "Work for Campaigns", allowed: true },
      { label: "Donate", allowed: true },
      { label: "Volunteer", allowed: true },
      { label: "Host Fundraisers", allowed: true },
      { label: "Contact Elected Officials", allowed: true },
    ],
  },
  {
    title: "US Citizen",
    subtitle: "Youth",
    color: "bg-hipac-brown",
    textColor: "text-hipac-brown",
    items: [
      { label: "Vote", allowed: false },
      { label: "Work as Poll Workers", allowed: false },
      { label: "Work for Campaigns", allowed: true },
      { label: "Donate", allowed: true },
      { label: "Volunteer", allowed: true },
      { label: "Host Fundraisers", allowed: true },
      { label: "Contact Elected Officials", allowed: true },
    ],
  },
  {
    title: "Green Card Holders",
    subtitle: "Adult",
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
    items: [
      { label: "Vote", allowed: false },
      { label: "Work as Poll Workers", allowed: false },
      { label: "Work for Campaigns", allowed: false },
      { label: "Donate", allowed: true },
      { label: "Volunteer (Unpaid)", allowed: true },
      { label: "Host Fundraisers", allowed: true },
      { label: "Contact Elected Officials", allowed: true },
    ],
  },
  {
    title: "Other Non-Citizens",
    subtitle: "Adult",
    color: "bg-indigo-800",
    textColor: "text-indigo-800",
    items: [
      { label: "Vote", allowed: false },
      { label: "Work as Poll Workers", allowed: false },
      { label: "Work for Campaigns", allowed: false },
      { label: "Donate", allowed: false },
      { label: "Volunteer (Unpaid)", allowed: true },
      { label: "Host Fundraisers", allowed: false },
      { label: "Contact Elected Officials", allowed: true },
    ],
  },
];

export default function ElectionToolkit() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>
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

      <section className="bg-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {involvementCards.map((card) => (
              <div
                key={`${card.title}-${card.subtitle}`}
                className="overflow-hidden rounded-2xl border border-hipac-border bg-hipac-warm-white shadow-card"
              >
                <div className={`${card.color} px-5 py-6 text-center`}>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1 font-heading text-sm font-semibold text-white/80">
                    {card.subtitle}
                  </p>
                </div>

                <ul className="divide-y divide-hipac-border px-5 py-4">
                  {card.items.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 py-3"
                    >
                      {item.allowed ? (
                        <CheckCircle2
                          size={18}
                          className={`shrink-0 ${card.textColor}`}
                        />
                      ) : (
                        <UserX
                          size={18}
                          className={`shrink-0 ${card.textColor} opacity-40`}
                        />
                      )}

                      <span
                        className={`font-body text-sm font-medium ${
                          item.allowed
                            ? card.textColor
                            : `${card.textColor} opacity-40 line-through`
                        }`}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-hipac-warm-white px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl">

          <div className="border-b border-hipac-border">
            <button
              type="button"
              onClick={() => toggleAccordion(0)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-heading text-lg font-bold text-hipac-orange">
                US Citizen
              </span>

              <ChevronDown
                size={20}
                className={`text-hipac-orange transition-transform duration-300 ${
                  openIndex === 0 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                openIndex === 0
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-6 font-body text-sm leading-7 text-hipac-muted">

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      1. Register to Vote
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Check your registration status: Visit Georgia's My
                        Voter Page (MVP) to confirm your registration
                        details.
                      </li>
                      <li>
                        Recently moved? Make sure your voter registration is
                        updated with your current address. The deadline to
                        update is 30 days before the election.
                      </li>
                      <li>
                        New voter? You can register online or by mail, but
                        you must be registered at least 30 days before the
                        election.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      2. Get Informed on the Issues
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Research the candidates and issues: Explore where
                        Georgia candidates stand on key topics that matter
                        to you.
                      </li>
                      <li>
                        Find reliable resources: Use non-partisan sites to
                        gather information on candidates' platforms and the
                        issues on the Georgia ballot.
                      </li>
                      <li>
                        Discuss with others: Talk with friends, family, and
                        your community to hear different viewpoints and
                        broaden your perspective.
                      </li>
                      <li>
                        Stay focused on your priorities: Concentrate on the
                        issues that directly impact you and your local
                        community.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      3. Plan How You'll Vote
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Choose your voting method: In Georgia, you can vote
                        in person, early, or by absentee ballot. Decide
                        which option works best for you and double-check
                        your registration status on the MVP page.
                      </li>
                      <li>
                        Early voting: Georgia offers in-person early voting
                        starting as early as three weeks before the
                        election. Check the dates and locations on the{" "}
                        <a
                          href="https://sos.ga.gov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-hipac-orange underline hover:text-hipac-brown"
                        >
                          Georgia Secretary of State's website
                        </a>
                        .
                      </li>
                      <li>
                        Absentee voting: Any registered voter in Georgia can
                        request an absentee ballot without needing a
                        reason. Submit your absentee ballot application at
                        least 11 days before the election.
                      </li>
                      <li>
                        Prepare your ballot: Find your personalized sample
                        ballot on the MVP page to preview what's on the
                        ballot before you vote.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      4. Cast Your Vote
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Voting in person? Locate your polling place and
                        check hours on MVP. Polls in Georgia are open from 7
                        AM to 7 PM on election day.
                      </li>
                      <li>
                        Absentee voting? Return your completed ballot by
                        mail or drop it off at an official ballot drop box
                        by the election day deadline. Make sure it's
                        postmarked by the deadline to ensure it's counted.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-hipac-border">
            <button
              type="button"
              onClick={() => toggleAccordion(1)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-heading text-lg font-bold text-hipac-brown">
                Youth
              </span>

              <ChevronDown
                size={20}
                className={`text-hipac-orange transition-transform duration-300 ${
                  openIndex === 1 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                openIndex === 1
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-6 font-body text-sm leading-7 text-hipac-muted">

                  <p>
                    Even if you're not old enough to vote, you can still make
                    a positive impact on elections in Georgia! By staying
                    informed and helping others, you can play a key role in
                    shaping your community. However, it's important to be
                    careful and make sure you're acting ethically, with the
                    guidance of your parents or guardians.
                  </p>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      1. Get Informed
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Research the issues and candidates: Learn about the
                        candidates running for office and the issues being
                        discussed. Make sure to use trusted, non-partisan
                        resources to gather your information.
                      </li>
                      <li>
                        Talk to your parents: Always involve your parents or
                        guardians when discussing candidates and issues.
                        They can help you understand the political landscape
                        and guide you in forming your own opinions.
                      </li>
                      <li>
                        Ask questions: Don't be afraid to ask your parents,
                        teachers, or trusted adults to explain any part of
                        the election process you don't understand.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      2. Stay Ethical and Involve Your Parents
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Be honest and transparent: Never lie or mislead
                        others about your political beliefs or affiliations.
                        It's important to always be clear and true to
                        yourself.
                      </li>
                      <li>
                        Talk to your parents: Before getting involved in any
                        election-related activity, make sure to talk to your
                        parents or guardians. They can give you advice and
                        help ensure that what you're doing is safe and
                        responsible.
                      </li>
                      <li>
                        Don't let anyone pressure you: If any group or
                        campaign asks you to pretend to be non-partisan just
                        to collect voter data or to organize a fake voter
                        drive, it's unethical. Always stand up for what's
                        right and don't let anyone ask you to do something
                        dishonest.
                      </li>
                      <li>
                        Get consent: If you're under 18, always get your
                        parents' permission before volunteering for any
                        political cause or organization. Their guidance will
                        help protect you from any potentially harmful or
                        unethical situations.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      3. How to Help During Election Season
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Volunteer: If you're old enough, many campaigns and
                        civic organizations allow youth volunteers. You can
                        help out with canvassing, phone banking, or passing
                        out flyers. Always check with your parents before
                        signing up.
                      </li>
                      <li>
                        Be a good example: Show others the importance of
                        being well-informed, acting responsibly, and
                        respecting the opinions of others during election
                        season. You can make a big impact by setting a
                        positive example for your peers.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-hipac-border">
            <button
              type="button"
              onClick={() => toggleAccordion(2)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="font-heading text-lg font-bold text-emerald-600">
                Non-Citizen
              </span>

              <ChevronDown
                size={20}
                className={`text-hipac-orange transition-transform duration-300 ${
                  openIndex === 2 ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                openIndex === 2
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-6 font-body text-sm leading-7 text-hipac-muted">

                  <p>
                    Even if you're not eligible to vote, there are still
                    meaningful ways to participate in the election process
                    and make your voice heard in Georgia. Your involvement
                    can help shape the future of your community.
                  </p>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      1. Stay Informed
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Learn about the candidates and issues: Research where
                        candidates stand on topics that matter to you, using
                        reliable, non-partisan sources.
                      </li>
                      <li>
                        Talk to others: Discuss the issues with friends,
                        family, and community members to share insights and
                        understand different perspectives.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      2. Help Others Get Involved
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Encourage voter registration: You can help eligible
                        voters in your community by reminding them to
                        register and check their voter status. Direct them
                        to Georgia's My Voter Page.
                      </li>
                      <li>
                        Spread accurate information: Share key dates, voting
                        methods, and ballot information to ensure others are
                        prepared for election day.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      3. Volunteer
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Join local civic groups: Many non-profit
                        organizations and community groups welcome
                        non-citizen volunteers to help with voter education,
                        organizing, and other election-related activities.
                      </li>
                      <li>
                        Support voter turnout: Help organize voter turnout
                        initiatives, such as driving people to the polls or
                        assisting with early voting information.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading text-base font-bold text-hipac-brown">
                      4. Stay Ethical
                    </h4>
                    <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-hipac-orange">
                      <li>
                        Be transparent: Always be clear about your role as a
                        non-voter. Do not engage in any activities that may
                        mislead others, such as pretending to be
                        non-partisan to gather voter data or organizing sham
                        voter drives.
                      </li>
                      <li>
                        Involve trusted sources: If you're unsure about any
                        requests made by a campaign or group, talk to a
                        community leader or trusted advisor to ensure you're
                        acting ethically.
                      </li>
                    </ul>
                  </div>

                  <p>
                    Even without voting rights, your actions can make a
                    difference by empowering others and supporting the
                    democratic process in a meaningful and responsible way.
                  </p>

                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 text-center">
            <h1 className="font-heading font-semibold text-3xl text-hipac-brown">
              When in doubt, talk to the Secretary of State!
            </h1>
            <p className="mt-1 font-body text-xs text-hipac-muted">
              We are only here to point you in the right direction. This
              should NOT be considered legal advice!
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}